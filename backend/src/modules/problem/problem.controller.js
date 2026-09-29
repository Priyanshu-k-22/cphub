const asyncHandler = require("../../middlewares/asyncHandler");
const ApiResponse = require("../../utils/ApiResponse");

const {
    createProblem,
    getAllProblems,
    updateProblem,
    deleteProblem,
    getDailyProblems,
    getProblemById,
    getProblemHistory,
    markDailyProblemComplete,
    markDailyProblemIncomplete,
    getDailyProblemProgress
} = require("./problem.service");


/*
    Create a new problem
*/
const create = asyncHandler(async (req, res) => {
    const problem = await createProblem(req.body);

    return res.status(201).json(
        new ApiResponse(
            201,
            problem,
            "Problem created successfully"
        )
    );
});

const getAll = asyncHandler(async (req, res) => {
    const problems = await getAllProblems();

    return res.status(200).json(
        new ApiResponse(200, problems, "Problems fetched successfully")
    );
});

const update = asyncHandler(async (req, res) => {
    const problem = await updateProblem(req.params.id, req.body);

    return res.status(200).json(
        new ApiResponse(200, problem, "Problem updated successfully")
    );
});

const remove = asyncHandler(async (req, res) => {
    const problem = await deleteProblem(req.params.id);

    return res.status(200).json(
        new ApiResponse(200, { _id: problem._id }, "Problem deleted successfully")
    );
});


/*
    Get today's daily problems
*/
const getDaily = asyncHandler(async (req, res) => {
    const { category } = req.query;

    const problems = await getDailyProblems({
        category
    });

    return res.status(200).json(
        new ApiResponse(
            200,
            problems,
            "Daily problems fetched successfully"
        )
    );
});

const markDailyComplete = asyncHandler(async (req, res) => {
    const progress = await markDailyProblemComplete({ userId: req.user._id, problemId: req.params.id });
    return res.status(200).json(new ApiResponse(200, progress, "Daily problem marked complete"));
});

const markDailyIncomplete = asyncHandler(async (req, res) => {
    const progress = await markDailyProblemIncomplete({ userId: req.user._id, problemId: req.params.id });
    return res.status(200).json(new ApiResponse(200, progress, "Daily problem marked incomplete"));
});

const getDailyProgress = asyncHandler(async (req, res) => {
    const progress = await getDailyProblemProgress({ userId: req.user._id, problemId: req.params.id });
    return res.status(200).json(new ApiResponse(200, progress, "Daily problem progress fetched successfully"));
});


/*
    Get a single problem
*/
const getById = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const problem = await getProblemById(id);

    return res.status(200).json(
        new ApiResponse(
            200,
            problem,
            "Problem fetched successfully"
        )
    );
});


/*
    Get problem history
*/
const getHistory = asyncHandler(async (req, res) => {

    const {
        search,
        category,
        difficulty,
        topic,
        tag,
        sort = "newest",
        page = 1,
        limit = 20
    } = req.query;

    const result = await getProblemHistory({
        search,
        category,
        difficulty,
        topic,
        tag,
        sort,
        page: Number(page),
        limit: Number(limit)
    });

    return res.status(200).json(
        new ApiResponse(
            200,
            result,
            "Problem history fetched successfully"
        )
    );
});
module.exports = {
    create,
    getAll,
    update,
    remove,
    getDaily,
    getById,
    getHistory,
    markDailyComplete,
    markDailyIncomplete,
    getDailyProgress
};
