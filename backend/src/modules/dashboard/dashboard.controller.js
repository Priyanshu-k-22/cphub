const asyncHandler =
    require("../../middlewares/asyncHandler");

const ApiResponse =
    require("../../utils/ApiResponse");

const User =
    require("../user/user.model");

const codeforcesService =
    require("../codeforces/codeforces.service");

const mongoose = require("mongoose");
const axios = require("axios");
const Problem = require("../problem/problem.model");
const CPProblem = require("../cpSheet/cpProblem.model");
const CPProgress = require("../cpSheet/cpProgress.model");
const DSAProblem = require("../dsaSheet/dsaProblem.model");
const DSATopic = require("../dsaSheet/dsaTopic.model");
const DSAProgress = require("../dsaSheet/dsaProgress.model");
const DailyProblemProgress = require("../problem/dailyProblemProgress.model");
const { getContests } = require("../contest/contest.service");

const getTodayDateBounds = () => {
    // The college's local day is India Standard Time (UTC+05:30).
    const now = new Date();
    const istNow = new Date(now.getTime() + (5 * 60 + 30) * 60_000);
    const year = istNow.getUTCFullYear();
    const month = istNow.getUTCMonth();
    const day = istNow.getUTCDate();
    const start = new Date(Date.UTC(year, month, day) - (5 * 60 + 30) * 60_000);
    return { start, end: new Date(start.getTime() + 24 * 60 * 60_000) };
};

let codeforcesHealthCache = {
    checkedAt: 0,
    status: "unknown",
};

const getCodeforcesHealth = async () => {
    const cacheAge = Date.now() - codeforcesHealthCache.checkedAt;
    if (cacheAge < 60_000 && codeforcesHealthCache.status !== "unknown") {
        return codeforcesHealthCache.status;
    }

    try {
        const response = await axios.get(
            "https://codeforces.com/api/contest.list",
            { timeout: 4000 }
        );
        codeforcesHealthCache = {
            checkedAt: Date.now(),
            status: response.data?.status === "OK" ? "operational" : "degraded",
        };
    } catch {
        codeforcesHealthCache = {
            checkedAt: Date.now(),
            status: "unavailable",
        };
    }

    return codeforcesHealthCache.status;
};


const getDashboard =
    asyncHandler(async (req, res) => {
        const userId = req.user._id;
        const utcToday = new Date();
        utcToday.setUTCHours(0, 0, 0, 0);
        const { start: dayStart, end: dayEnd } = getTodayDateBounds();

        const [user, codeforces, cpProblems, topics, dailyProblems, contestsResult] = await Promise.all([
            User.findById(userId).select("username profile").lean(),
            codeforcesService.getCodeforcesProfile(userId),
            CPProblem.find({ sheet: "beginner-cp", isActive: true }).select("_id").lean(),
            DSATopic.find({ isActive: true }).sort({ order: 1, name: 1 }).select("_id name").lean(),
            Problem.find({ dailyDate: utcToday, isPublished: true })
                .select("title category difficulty rating platform externalLink dailyDate")
                .sort({ category: 1 }).lean(),
            getContests().catch((error) => {
                console.error("Dashboard contest fetch failed:", error.message);
                return null;
            }),
        ]);

        if (!user) return res.status(404).json(new ApiResponse(404, null, "User not found"));

        const cpIds = cpProblems.map((problem) => problem._id);
        const topicIds = topics.map((topic) => topic._id);
        const [dsaProblems, cpSolvedRows, cpToday, dailyProgress, cpRecent, dsaRecent, dailyRecent] = await Promise.all([
            topicIds.length ? DSAProblem.find({ topic: { $in: topicIds } }).select("_id topic").lean() : [],
            cpIds.length ? CPProgress.find({ user: userId, problem: { $in: cpIds }, solved: true }).select("problem").lean() : [],
            cpIds.length ? CPProgress.countDocuments({ user: userId, problem: { $in: cpIds }, solved: true, solvedAt: { $gte: dayStart, $lt: dayEnd } }) : 0,
            dailyProblems.length ? DailyProblemProgress.find({ user: userId, problem: { $in: dailyProblems.map((problem) => problem._id) } }).select("problem solved solvedAt").lean() : [],
            CPProgress.find({ user: userId, solved: true, solvedAt: { $ne: null } }).sort({ solvedAt: -1 }).limit(6).populate("problem", "title rating").lean(),
            DSAProgress.find({ user: userId, solved: true, solvedAt: { $ne: null } }).sort({ solvedAt: -1 }).limit(6).populate("problem", "title").lean(),
            DailyProblemProgress.find({ user: userId, solved: true, solvedAt: { $ne: null } }).sort({ solvedAt: -1 }).limit(6).populate("problem", "title category").lean(),
        ]);

        const dsaIds = dsaProblems.map((problem) => problem._id);
        const [dsaSolvedRows, dsaSolvedToday] = await Promise.all([
            dsaIds.length ? DSAProgress.find({ user: userId, problem: { $in: dsaIds }, solved: true }).select("problem").lean() : [],
            dsaIds.length ? DSAProgress.countDocuments({ user: userId, problem: { $in: dsaIds }, solved: true, solvedAt: { $gte: dayStart, $lt: dayEnd } }) : 0,
        ]);

        const cpSolved = cpSolvedRows.length;
        const dsaSolved = dsaSolvedRows.length;
        const topicForProblem = new Map(dsaProblems.map((problem) => [String(problem._id), String(problem.topic)]));
        const topicSolved = new Map();
        const topicTotals = new Map();
        for (const problem of dsaProblems) topicTotals.set(String(problem.topic), (topicTotals.get(String(problem.topic)) || 0) + 1);
        for (const row of dsaSolvedRows) {
            const topicId = topicForProblem.get(String(row.problem));
            if (topicId) topicSolved.set(topicId, (topicSolved.get(topicId) || 0) + 1);
        }
        const currentTopic = topics.find((topic) => (topicSolved.get(String(topic._id)) || 0) < (topicTotals.get(String(topic._id)) || 0));

        const dailyProgressById = new Map(dailyProgress.map((row) => [String(row.problem), row]));
        const todayProblems = dailyProblems.map((problem) => ({
            ...problem,
            solved: Boolean(dailyProgressById.get(String(problem._id))?.solved),
        }));
        const dailySolvedToday = dailyProgress.filter((row) => row.solved && row.solvedAt >= dayStart && row.solvedAt < dayEnd).length;
        const activity = [
            ...cpRecent.filter((row) => row.problem).map((row) => ({ id: `cp-${row._id}`, type: "cp", title: `Solved ${row.problem.title}`, detail: row.problem.rating ? `${row.problem.rating} rating · CP Sheet` : "CP Sheet", occurredAt: row.solvedAt, href: "/cp-sheet" })),
            ...dsaRecent.filter((row) => row.problem).map((row) => ({ id: `dsa-${row._id}`, type: "dsa", title: `Solved ${row.problem.title}`, detail: "DSA Sheet", occurredAt: row.solvedAt, href: "/dsa-sheet" })),
            ...dailyRecent.filter((row) => row.problem).map((row) => ({ id: `daily-${row._id}`, type: "daily", title: `Solved ${row.problem.title}`, detail: `${row.problem.category || "Daily"} · Daily Problem`, occurredAt: row.solvedAt, href: "/problems/history" })),
        ].sort((a, b) => new Date(b.occurredAt) - new Date(a.occurredAt)).slice(0, 6);
        const contests = contestsResult
            ? contestsResult.filter((contest) => new Date(contest.startTime) > new Date()).slice(0, 3)
            : [];

        return res.status(200).json(new ApiResponse(200, {
            user,
            codeforces,
            cpProgress: { solved: cpSolved, total: cpProblems.length, percentage: cpProblems.length ? Math.round(cpSolved / cpProblems.length * 100) : 0 },
            dsaProgress: { solved: dsaSolved, total: dsaProblems.length, percentage: dsaProblems.length ? Math.round(dsaSolved / dsaProblems.length * 100) : 0, currentTopic: currentTopic?.name || null },
            todayProgress: { cp: { solved: cpToday }, dsa: { solved: dsaSolvedToday }, daily: { solved: dailySolvedToday, total: dailyProblems.length }, timezone: "Asia/Kolkata" },
            todayProblems,
            contests,
            contestsUnavailable: !contestsResult,
            activity,
        }, "Dashboard fetched successfully"));
    });

const getAdminDashboard = asyncHandler(async (req, res) => {
    const [
        totalUsers,
        activeCPProblems,
        totalDailyProblems,
        solvedCPProblems,
        recentUsers,
        recentDailyProblems,
        recentCPProblems,
        recentSolves,
        codeforcesStatus,
    ] = await Promise.all([
        User.countDocuments(),
        CPProblem.countDocuments({ isActive: true }),
        Problem.countDocuments(),
        CPProgress.countDocuments({ solved: true }),
        User.find().sort({ createdAt: -1 }).limit(5).select("username createdAt").lean(),
        Problem.find().sort({ updatedAt: -1 }).limit(5)
            .select("title category createdAt updatedAt").lean(),
        CPProblem.find().sort({ updatedAt: -1 }).limit(5)
            .select("title createdAt updatedAt").lean(),
        CPProgress.find({ solved: true, solvedAt: { $ne: null } })
            .sort({ solvedAt: -1 }).limit(5)
            .populate("user", "username")
            .populate("problem", "title")
            .lean(),
        getCodeforcesHealth(),
    ]);

    const activity = [
        ...recentUsers.map((user) => ({
            id: `user-${user._id}`,
            type: "user",
            title: "User registered",
            detail: user.username,
            occurredAt: user.createdAt,
        })),
        ...recentDailyProblems.map((problem) => ({
            id: `daily-${problem._id}`,
            type: "dailyProblem",
            title: new Date(problem.updatedAt) > new Date(problem.createdAt)
                ? "Daily problem updated"
                : "Daily problem added",
            detail: `${problem.category} · ${problem.title}`,
            occurredAt: problem.updatedAt || problem.createdAt,
        })),
        ...recentCPProblems.map((problem) => ({
            id: `cp-${problem._id}`,
            type: "cpProblem",
            title: new Date(problem.updatedAt) > new Date(problem.createdAt)
                ? "CP sheet problem updated"
                : "CP sheet problem added",
            detail: problem.title,
            occurredAt: problem.updatedAt || problem.createdAt,
        })),
        ...recentSolves.map((progress) => ({
            id: `solve-${progress._id}`,
            type: "solve",
            title: "CP problem solved",
            detail: `${progress.user?.username || "User"} · ${progress.problem?.title || "Problem"}`,
            occurredAt: progress.solvedAt,
        })),
    ]
        .sort((a, b) => new Date(b.occurredAt) - new Date(a.occurredAt))
        .slice(0, 8);

    return res.status(200).json(
        new ApiResponse(200, {
            stats: {
                totalUsers,
                activeCPProblems,
                totalDailyProblems,
                solvedCPProblems,
            },
            activity,
            health: {
                api: "operational",
                database: mongoose.connection.readyState === 1 ? "operational" : "unavailable",
                authentication: req.user?._id ? "operational" : "unavailable",
                codeforces: codeforcesStatus,
            },
            generatedAt: new Date(),
        }, "Admin dashboard fetched successfully")
    );
});


module.exports = {
    getDashboard,
    getAdminDashboard,
};
