const mongoose = require("mongoose");

const Problem = require("./problem.model");
const ApiError = require("../../utils/ApiError");

/*
    Normalize the daily date to UTC midnight.

    Example:
    2026-09-22T15:30:00
            ↓
    2026-09-22T00:00:00
*/
const normalizeDailyDate = (date) => {
    const normalizedDate = new Date(date);

    normalizedDate.setUTCHours(0, 0, 0, 0);

    return normalizedDate;
};


/*
    Create a new problem.

    A daily problem is permanently stored
    inside the Problem collection.
*/
const createProblem = async (data) => {
    const dailyDate = normalizeDailyDate(data.dailyDate);

    /*
        Check whether this category already has
        a problem for this day.
    */
    const existingProblem = await Problem.findOne({
        category: data.category,
        dailyDate
    });

    if (existingProblem) {
        throw new ApiError(
            409,
            `${data.category} problem already exists for this date`
        );
    }

    /*
        Check slug separately so we can return
        a clean error message.
    */
    const existingSlug = await Problem.findOne({
        slug: data.slug
    });

    if (existingSlug) {
        throw new ApiError(
            409,
            "A problem with this slug already exists"
        );
    }

    const problem = await Problem.create({
        ...data,
        dailyDate
    });

    return problem;
};

const getAllProblems = async () => {
    return Problem.find()
        .sort({ dailyDate: -1, createdAt: -1 })
        .lean();
};

const updateProblem = async (problemId, data) => {
    if (!mongoose.Types.ObjectId.isValid(problemId)) {
        throw new ApiError(400, "Invalid problem ID");
    }

    const dailyDate = normalizeDailyDate(data.dailyDate);
    const problem = await Problem.findById(problemId);
    if (!problem) {
        throw new ApiError(404, "Problem not found");
    }

    const existingForDate = await Problem.findOne({
        _id: { $ne: problemId },
        category: data.category,
        dailyDate,
    });
    if (existingForDate) {
        throw new ApiError(409, `${data.category} problem already exists for this date`);
    }

    const existingSlug = await Problem.findOne({
        _id: { $ne: problemId },
        slug: data.slug,
    });
    if (existingSlug) {
        throw new ApiError(409, "A problem with this slug already exists");
    }

    Object.assign(problem, data, { dailyDate });
    if (data.category === "DSA") {
        problem.intuition = "";
        problem.approach = "";
        problem.code = "";
        problem.timeComplexity = "";
        problem.spaceComplexity = "";
    } else {
        problem.brute = undefined;
        problem.better = undefined;
        problem.optimal = undefined;
    }

    await problem.save();
    return problem;
};

const deleteProblem = async (problemId) => {
    if (!mongoose.Types.ObjectId.isValid(problemId)) {
        throw new ApiError(400, "Invalid problem ID");
    }

    const problem = await Problem.findByIdAndDelete(problemId);
    if (!problem) {
        throw new ApiError(404, "Problem not found");
    }

    return problem;
};


/*
    Get today's published problems.

    By default this returns:
        - one DSA problem
        - one CP problem

    If category is provided, it returns only
    that category.
*/
const getDailyProblems = async ({
    date = new Date(),
    category
} = {}) => {
    const dailyDate = normalizeDailyDate(date);

    const query = {
        dailyDate,
        isPublished: true
    };

    if (category) {
        query.category = category;
    }

    const problems = await Problem.find(query)
        .sort({ category: 1 })
        .lean();

    return problems;
};


/*
    Get a single problem by ID.
*/
const getProblemById = async (problemId) => {
    if (!mongoose.Types.ObjectId.isValid(problemId)) {
        throw new ApiError(
            400,
            "Invalid problem ID"
        );
    }

    const problem = await Problem.findById(problemId)
        .lean();

    if (!problem) {
        throw new ApiError(
            404,
            "Problem not found"
        );
    }

    return problem;
};


/*
    Get previous daily problems.

    Supports:
        - category filter
        - pagination
*/

const getProblemHistory = async ({
    search,
    category,
    difficulty,
    topic,
    tag,
    sort = "newest",
    page = 1,
    limit = 20
} = {}) => {

    const skip = (page - 1) * limit;

    const query = {
        isPublished: true
    };

    if (search) {
        query.title = {
            $regex: search,
            $options: "i"
        };
    }

    if (category) {
        query.category = category;
    }

    if (difficulty) {
        query.difficulty = difficulty;
    }

    if (topic) {
        query.topics = topic;
    }

    if (tag) {
        query.tags = tag;
    }

    let sortQuery = {
        dailyDate: -1
    };

    if (sort === "oldest") {
        sortQuery = {
            dailyDate: 1
        };
    }

    const [problems, total] =
        await Promise.all([
            Problem.find(query)
                .sort(sortQuery)
                .skip(skip)
                .limit(limit)
                .lean(),

            Problem.countDocuments(query)
        ]);

    return {
        problems,

        pagination: {
            page,
            limit,
            total,
            totalPages: Math.ceil(
                total / limit
            )
        }
    };
};

module.exports = {
    createProblem,
    getAllProblems,
    updateProblem,
    deleteProblem,
    getDailyProblems,
    getProblemById,
    getProblemHistory
};
