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

        const user =
            await User.findById(
                req.user._id
            )
            .select(
                "username profile"
            )
            .lean();


        if (!user) {

            return res.status(404).json(
                new ApiResponse(
                    404,
                    null,
                    "User not found"
                )
            );
        }


        const codeforces = await codeforcesService.getCodeforcesProfile(
            req.user._id
        );


        return res.status(200).json(
            new ApiResponse(
                200,

                {
                    user: {
                        username:
                            user.username,

                        profile:
                            user.profile
                    },

                    codeforces
                },

                "Dashboard fetched successfully"
            )
        );
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
