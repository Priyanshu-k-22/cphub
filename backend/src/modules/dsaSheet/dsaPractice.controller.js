const asyncHandler = require("../../middlewares/asyncHandler");
const ApiResponse = require("../../utils/ApiResponse");
const service = require("./dsaPractice.service");

const listTopics = asyncHandler(async (req, res) => res.status(200).json(new ApiResponse(200, await service.listTopics(req.user._id), "DSA topics fetched successfully")));
const listTopicsAdmin = asyncHandler(async (_req, res) => res.status(200).json(new ApiResponse(200, await service.listTopicsAdmin(), "DSA topics fetched successfully")));
const createTopic = asyncHandler(async (req, res) => res.status(201).json(new ApiResponse(201, await service.createTopic(req.body), "DSA topic created successfully")));
const updateTopic = asyncHandler(async (req, res) => res.status(200).json(new ApiResponse(200, await service.updateTopic(req.params.topicId, req.body), "DSA topic updated successfully")));
const deleteTopic = asyncHandler(async (req, res) => {
    const topic = await service.deleteTopic(req.params.topicId);
    return res.status(200).json(new ApiResponse(200, { _id: topic._id }, "DSA topic deleted successfully"));
});
const getTopicProblems = asyncHandler(async (req, res) => res.status(200).json(new ApiResponse(200, await service.getProblemsForTopic({ userId: req.user._id, slug: req.params.slug, page: req.query.page, limit: req.query.limit }), "DSA problems fetched successfully")));
const listProblemsAdmin = asyncHandler(async (req, res) => res.status(200).json(new ApiResponse(200, await service.listProblemsAdmin(req.query.topicId, { page: req.query.page, limit: req.query.limit }), "DSA problems fetched successfully")));
const createProblem = asyncHandler(async (req, res) => res.status(201).json(new ApiResponse(201, await service.createProblem(req.body), "DSA problem created successfully")));
const updateProblem = asyncHandler(async (req, res) => res.status(200).json(new ApiResponse(200, await service.updateProblem(req.params.problemId, req.body), "DSA problem updated successfully")));
const deleteProblem = asyncHandler(async (req, res) => {
    const problem = await service.deleteProblem(req.params.problemId);
    return res.status(200).json(new ApiResponse(200, { _id: problem._id }, "DSA problem deleted successfully"));
});
const markComplete = asyncHandler(async (req, res) => res.status(200).json(new ApiResponse(200, await service.markProblemComplete({ userId: req.user._id, problemId: req.params.problemId }), "DSA problem marked solved")));
const markIncomplete = asyncHandler(async (req, res) => res.status(200).json(new ApiResponse(200, await service.markProblemIncomplete({ userId: req.user._id, problemId: req.params.problemId }), "DSA problem marked unsolved")));

module.exports = { listTopics, listTopicsAdmin, createTopic, updateTopic, deleteTopic, getTopicProblems, listProblemsAdmin, createProblem, updateProblem, deleteProblem, markComplete, markIncomplete };
