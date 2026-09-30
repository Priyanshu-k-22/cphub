const mongoose = require("mongoose");
const ApiError = require("../../utils/ApiError");
const DSATopic = require("./dsaTopic.model");
const DSAProblem = require("./dsaProblem.model");
const DSAProgress = require("./dsaProgress.model");

const slugify = (value) => value.normalize("NFKD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const assertId = (id, type) => {
    if (!mongoose.Types.ObjectId.isValid(id)) throw new ApiError(400, `Invalid ${type} ID`);
};
const normalizeTopic = (data = {}) => {
    const name = typeof data.name === "string" ? data.name.trim() : "";
    const description = typeof data.description === "string" ? data.description.trim() : "";
    const slug = slugify(typeof data.slug === "string" && data.slug.trim() ? data.slug : name);
    const order = data.order === undefined || data.order === "" ? 0 : Number(data.order);
    if (!name) throw new ApiError(400, "Topic name is required");
    if (!slug || slug.length > 100) throw new ApiError(400, "Enter a valid topic name or slug");
    if (description.length > 1000) throw new ApiError(400, "Topic description must be 1000 characters or fewer");
    if (!Number.isInteger(order) || order < 0) throw new ApiError(400, "Topic order must be a non-negative integer");
    return { name, slug, description, order };
};
const normalizeProblem = (data = {}) => {
    const topic = data.topicId || data.topic;
    assertId(topic, "topic");
    const title = typeof data.title === "string" ? data.title.trim() : "";
    const url = typeof data.url === "string" ? data.url.trim() : "";
    const platform = typeof data.platform === "string" ? data.platform.trim() : "Other";
    const difficulty = typeof data.difficulty === "string" ? data.difficulty : "";
    const order = Number(data.order);
    const hint = typeof data.hint === "string" ? data.hint.trim() : "";
    if (!title) throw new ApiError(400, "Problem title is required");
    if (!url || url.length > 600) throw new ApiError(400, "A practice URL is required");
    try {
        const parsed = new URL(url);
        if (!["http:", "https:"].includes(parsed.protocol)) throw new Error("Unsupported protocol");
    } catch { throw new ApiError(400, "Enter a valid http or https problem URL"); }
    if (!platform || platform.length > 60) throw new ApiError(400, "Enter a valid platform name");
    if (!["Easy", "Medium", "Hard"].includes(difficulty)) throw new ApiError(400, "Difficulty must be Easy, Medium, or Hard");
    if (!Number.isInteger(order) || order < 1) throw new ApiError(400, "Problem order must be a positive integer");
    if (hint.length > 2000) throw new ApiError(400, "Hint must be 2000 characters or fewer");
    return { topic, title, url, platform, difficulty, order, hint };
};
const throwDuplicateTopic = (error) => {
    if (error?.code === 11000) throw new ApiError(409, "A topic with that name or slug already exists");
    throw error;
};

const listTopics = async (userId) => {
    const topics = await DSATopic.find({ isActive: true }).sort({ order: 1, name: 1 }).lean();
    if (!topics.length) return [];
    const ids = topics.map((topic) => topic._id);
    const [totals, solvedRows] = await Promise.all([
        DSAProblem.aggregate([
            { $match: { topic: { $in: ids } } },
            { $group: { _id: "$topic", total: { $sum: 1 } } },
        ]),
        DSAProgress.aggregate([
            { $match: { user: new mongoose.Types.ObjectId(userId), solved: true } },
            { $lookup: { from: DSAProblem.collection.name, localField: "problem", foreignField: "_id", as: "problem" } },
            { $unwind: "$problem" },
            { $match: { "problem.topic": { $in: ids } } },
            { $group: { _id: "$problem.topic", solved: { $sum: 1 } } },
        ]),
    ]);
    const totalMap = new Map(totals.map((row) => [String(row._id), row.total]));
    const solvedMap = new Map(solvedRows.map((row) => [String(row._id), row.solved]));
    return topics.map((topic) => {
        const total = totalMap.get(String(topic._id)) || 0;
        const solved = solvedMap.get(String(topic._id)) || 0;
        return { ...topic, total, solved, percentage: total ? Math.round((solved / total) * 100) : 0 };
    });
};
const listTopicsAdmin = async () => DSATopic.find().sort({ order: 1, name: 1 }).lean();
const createTopic = async (data) => {
    try { return await DSATopic.create(normalizeTopic(data)); }
    catch (error) { throwDuplicateTopic(error); }
};
const updateTopic = async (id, data) => {
    assertId(id, "topic");
    try {
        const topic = await DSATopic.findByIdAndUpdate(id, { $set: normalizeTopic(data) }, { new: true, runValidators: true });
        if (!topic) throw new ApiError(404, "DSA topic not found");
        return topic;
    } catch (error) { throwDuplicateTopic(error); }
};
const deleteTopic = async (id) => {
    assertId(id, "topic");
    const topic = await DSATopic.findById(id);
    if (!topic) throw new ApiError(404, "DSA topic not found");
    if (await DSAProblem.exists({ topic: id })) throw new ApiError(409, "Move or delete this topic’s problems before deleting the topic");
    await topic.deleteOne();
    return topic;
};
const getProblemsForTopic = async ({ userId, slug, page = 1, limit = 20 }) => {
    const safePage = Math.max(1, Number(page) || 1);
    const safeLimit = Math.min(100, Math.max(1, Number(limit) || 20));
    const topic = await DSATopic.findOne({ slug, isActive: true }).lean();
    if (!topic) throw new ApiError(404, "DSA topic not found");
    const query = { topic: topic._id };
    const [problems, total, solvedRows] = await Promise.all([
        DSAProblem.find(query).sort({ order: 1, _id: 1 }).skip((safePage - 1) * safeLimit).limit(safeLimit).lean(),
        DSAProblem.countDocuments(query),
        DSAProgress.aggregate([
            { $match: { user: new mongoose.Types.ObjectId(userId), solved: true } },
            { $lookup: { from: DSAProblem.collection.name, localField: "problem", foreignField: "_id", as: "problem" } },
            { $unwind: "$problem" },
            { $match: { "problem.topic": topic._id } },
            { $count: "solved" },
        ]),
    ]);
    const ids = problems.map((problem) => problem._id);
    const completed = ids.length ? await DSAProgress.find({ user: userId, problem: { $in: ids }, solved: true }).select("problem").lean() : [];
    const solvedSet = new Set(completed.map((row) => String(row.problem)));
    const rows = problems.map((problem) => ({ ...problem, solved: solvedSet.has(String(problem._id)) }));
    const solved = solvedRows[0]?.solved || 0;
    return { topic, problems: rows, progress: { solved, total, percentage: total ? Math.round((solved / total) * 100) : 0 }, pagination: { page: safePage, limit: safeLimit, total, totalPages: Math.ceil(total / safeLimit) } };
};
const listProblemsAdmin = async (topicId, { page = 1, limit = 20 } = {}) => {
    const safePage = Math.max(1, Number(page) || 1);
    const safeLimit = Math.min(100, Math.max(1, Number(limit) || 20));
    assertId(topicId, "topic");
    if (!await DSATopic.exists({ _id: topicId })) throw new ApiError(404, "DSA topic not found");
    const query = { topic: topicId };
    const [problems, total] = await Promise.all([
        DSAProblem.find(query).sort({ order: 1, _id: 1 }).skip((safePage - 1) * safeLimit).limit(safeLimit).lean(),
        DSAProblem.countDocuments(query),
    ]);
    return { problems, pagination: { page: safePage, limit: safeLimit, total, totalPages: Math.ceil(total / safeLimit) } };
};
const createProblem = async (data) => {
    const normalized = normalizeProblem(data);
    if (!await DSATopic.exists({ _id: normalized.topic, isActive: true })) throw new ApiError(404, "Active DSA topic not found");
    return DSAProblem.create(normalized);
};
const updateProblem = async (id, data) => {
    assertId(id, "problem");
    const normalized = normalizeProblem(data);
    if (!await DSATopic.exists({ _id: normalized.topic, isActive: true })) throw new ApiError(404, "Active DSA topic not found");
    const problem = await DSAProblem.findByIdAndUpdate(id, { $set: normalized }, { new: true, runValidators: true });
    if (!problem) throw new ApiError(404, "DSA problem not found");
    return problem;
};
const deleteProblem = async (id) => {
    assertId(id, "problem");
    const problem = await DSAProblem.findById(id);
    if (!problem) throw new ApiError(404, "DSA problem not found");
    await DSAProgress.deleteMany({ problem: id });
    await problem.deleteOne();
    return problem;
};
const markProblemComplete = async ({ userId, problemId }) => {
    assertId(problemId, "problem");
    if (!await DSAProblem.exists({ _id: problemId })) throw new ApiError(404, "DSA problem not found");
    return DSAProgress.findOneAndUpdate(
        { user: userId, problem: problemId },
        { $set: { solved: true, solvedAt: new Date() } },
        { new: true, upsert: true, setDefaultsOnInsert: true }
    );
};
const markProblemIncomplete = async ({ userId, problemId }) => {
    assertId(problemId, "problem");
    if (!await DSAProblem.exists({ _id: problemId })) throw new ApiError(404, "DSA problem not found");
    return DSAProgress.findOneAndUpdate(
        { user: userId, problem: problemId },
        { $set: { solved: false, solvedAt: null } },
        { new: true }
    );
};

module.exports = { listTopics, listTopicsAdmin, createTopic, updateTopic, deleteTopic, getProblemsForTopic, listProblemsAdmin, createProblem, updateProblem, deleteProblem, markProblemComplete, markProblemIncomplete };
