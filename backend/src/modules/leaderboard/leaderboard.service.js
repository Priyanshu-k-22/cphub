const CPProblem = require("../cpSheet/cpProblem.model");
const CPProgress = require("../cpSheet/cpProgress.model");
const DSAProblem = require("../dsaSheet/dsaProblem.model");
const DSATopic = require("../dsaSheet/dsaTopic.model");
const DSAProgress = require("../dsaSheet/dsaProgress.model");
const Problem = require("../problem/problem.model");
const DailyProblemProgress = require("../problem/dailyProblemProgress.model");
const User = require("../user/user.model");
const ApiError = require("../../utils/ApiError");

const SOURCES = {
    "cp-sheet": {
        progress: CPProgress,
        problem: CPProblem,
        problemMatch: { isActive: true, sheet: "beginner-cp" },
    },
    "dsa-sheet": {
        progress: DSAProgress,
        problem: DSAProblem,
        problemMatch: {},
        topic: DSATopic,
    },
    "daily-problem": {
        progress: DailyProblemProgress,
        problem: Problem,
        problemMatch: { isPublished: true },
    },
};

const problemFilter = (filters = {}) => Object.fromEntries(
    Object.entries(filters).map(([field, value]) => [`problem.${field}`, value])
);

const normalizePeriod = (period) => {
    const value = String(period || "all-time").trim().toLowerCase().replace(/[\s_]+/g, "-");
    if (["all-time", "alltime"].includes(value)) return "all-time";
    if (["year", "this-year", "yearly"].includes(value)) return "year";
    if (["month", "monthly", "this-month"].includes(value)) return "month";
    throw new ApiError(400, "Period must be all-time, this-year, or monthly");
};

const getPeriodStart = (period, now = new Date()) => {
    if (period === "all-time") return null;
    if (period === "year") return new Date(Date.UTC(now.getUTCFullYear(), 0, 1));
    if (period === "month") return new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1));
    throw new ApiError(400, "Unsupported leaderboard period");
};

const countAvailableProblems = async (type, source) => {
    if (type === "dsa-sheet") {
        const rows = await source.problem.aggregate([
            { $lookup: { from: source.topic.collection.name, localField: "topic", foreignField: "_id", as: "topic" } },
            { $unwind: "$topic" },
            { $match: { "topic.isActive": true } },
            { $count: "total" },
        ]);
        return rows[0]?.total || 0;
    }
    return source.problem.countDocuments(source.problemMatch);
};

const getLeaderboard = async ({ type, period = "all-time", page = 1, limit = 50 } = {}) => {
    const source = SOURCES[type];
    if (!source) throw new ApiError(400, "Type must be cp-sheet, dsa-sheet, or daily-problem");

    const normalizedPeriod = normalizePeriod(period);
    const safePage = Math.max(1, Number.parseInt(page, 10) || 1);
    const safeLimit = Math.min(100, Math.max(1, Number.parseInt(limit, 10) || 50));
    const periodStart = getPeriodStart(normalizedPeriod);
    const [totalProblems, leaderboard] = await Promise.all([
        countAvailableProblems(type, source),
        source.progress.aggregate([
            { $match: { solved: true, ...(periodStart ? { solvedAt: { $gte: periodStart } } : {}) } },
            { $lookup: { from: source.problem.collection.name, localField: "problem", foreignField: "_id", as: "problem" } },
            { $unwind: "$problem" },
            { $match: problemFilter(source.problemMatch) },
            ...(source.topic ? [
                { $lookup: { from: source.topic.collection.name, localField: "problem.topic", foreignField: "_id", as: "topic" } },
                { $unwind: "$topic" },
                { $match: { "topic.isActive": true } },
            ] : []),
            { $group: { _id: "$user", solved: { $sum: 1 }, lastSolvedAt: { $max: "$solvedAt" } } },
            { $facet: {
                metadata: [{ $count: "total" }],
                leaderboard: [
                    { $sort: { solved: -1, lastSolvedAt: 1, _id: 1 } },
                    { $skip: (safePage - 1) * safeLimit },
                    { $limit: safeLimit },
                    { $lookup: { from: User.collection.name, localField: "_id", foreignField: "_id", as: "user" } },
                    { $unwind: "$user" },
                    { $project: {
                        _id: 0,
                        userId: "$user._id",
                        username: "$user.username",
                        avatar: { $ifNull: ["$user.profile.avatar", ""] },
                        college: { $ifNull: ["$user.profile.college", ""] },
                        department: { $ifNull: ["$user.profile.department", ""] },
                        currentSemester: { $ifNull: ["$user.profile.currentSemester", ""] },
                        solved: 1,
                        score: "$solved",
                        lastSolvedAt: 1,
                    } },
                ],
            } },
        ]),
    ]);

    const offset = (safePage - 1) * safeLimit;
    const result = leaderboard[0] || { metadata: [], leaderboard: [] };
    const rows = result.leaderboard.map((row, index) => ({ ...row, rank: offset + index + 1 }));
    const total = result.metadata[0]?.total || 0;
    return {
        type,
        period: normalizedPeriod,
        leaderboard: rows,
        pagination: { page: safePage, limit: safeLimit, total, totalPages: Math.ceil(total / safeLimit) },
        totalProblems,
    };
};

module.exports = { getLeaderboard };
