const CPProblem = require("./cpProblem.model.js");
const CPProgress = require("./cpProgress.model.js");
const mongoose = require("mongoose");
const ApiError = require("../../utils/ApiError.js");

const getCPSheet = async ({
    userId,
    rating,
    sheet = "beginner-cp",
}) => {
    const query = {
        sheet,
        isActive: true,
    };

    if (rating) {
        query.rating = Number(rating);
    }

    const problems = await CPProblem.find(query)
        .sort({
            rating: 1,
            order: 1,
        })
        .lean();

    if (!problems.length) {
        return {
            rating: rating ? Number(rating) : null,
            problems: [],
            progress: {
                solved: 0,
                total: 0,
                percentage: 0,
            },
        };
    }

    const problemIds = problems.map(
        (problem) => problem._id
    );

    const completedProblems =
        await CPProgress.find({
            user: userId,
            problem: {
                $in: problemIds,
            },
            solved: true,
        })
            .select("problem")
            .lean();

    const solvedSet = new Set(
        completedProblems.map(
            (item) => item.problem.toString()
        )
    );

    const formattedProblems = problems.map(
        (problem) => ({
            ...problem,
            solved: solvedSet.has(
                problem._id.toString()
            ),
        })
    );

    const solved = completedProblems.length;
    const total = problems.length;

    return {
        rating: rating ? Number(rating) : null,

        problems: formattedProblems,

        progress: {
            solved,
            total,
            percentage:
                total === 0
                    ? 0
                    : Math.round(
                          (solved / total) * 100
                      ),
        },
    };
};


/* -------------------------------------------
   Mark Problem Complete
-------------------------------------------- */

const markProblemComplete = async ({
    userId,
    problemId,
}) => {
    const problem = await CPProblem.findOne({
        _id: problemId,
        isActive: true,
    });

    if (!problem) {
        throw new Error(
            "CP problem not found"
        );
    }

    const progress =
        await CPProgress.findOneAndUpdate(
            {
                user: userId,
                problem: problemId,
            },
            {
                $set: {
                    solved: true,
                    solvedAt: new Date(),
                },
            },
            {
                new: true,
                upsert: true,
                setDefaultsOnInsert: true,
            }
        );

    return progress;
};


/* -------------------------------------------
   Mark Problem Incomplete
-------------------------------------------- */

const markProblemIncomplete = async ({
    userId,
    problemId,
}) => {
    const progress =
        await CPProgress.findOne({
            user: userId,
            problem: problemId,
        });

    if (!progress) {
        return null;
    }

    progress.solved = false;
    progress.solvedAt = null;

    await progress.save();

    return progress;
};


/* -------------------------------------------
   Create CP Problem
-------------------------------------------- */

const createCPProblem = async ({
    title,
    codeforcesId,
    rating,
    order,
    hint = "",
    solution = "",
    code = "",
    sheet = "beginner-cp",
}) => {

    if (!title) {
        throw new Error("Problem title is required");
    }

    if (!codeforcesId) {
        throw new Error(
            "Codeforces problem ID is required"
        );
    }

    if (!rating) {
        throw new Error(
            "Problem rating is required"
        );
    }

    const url =
        `https://codeforces.com/problemset/problem/${codeforcesId}`;


    const problem = await CPProblem.create({
        title,
        codeforcesId,
        url,
        rating: Number(rating),
        order: Number(order),
        hint,
        solution,
        code,
        sheet,
        isActive: true,
    });


    return problem;
};


/* -------------------------------------------
   Update CP Problem
-------------------------------------------- */

const updateCPProblem = async (problemId, data) => {
    if (!mongoose.Types.ObjectId.isValid(problemId)) {
        throw new ApiError(400, "Invalid CP problem ID");
    }

    const allowedRatings = [800, 900, 1000, 1100, 1200];
    const title = typeof data.title === "string" ? data.title.trim() : "";
    const codeforcesId = typeof data.codeforcesId === "string"
        ? data.codeforcesId.trim()
        : "";
    const rating = Number(data.rating);
    const order = Number(data.order);
    const hint = typeof data.hint === "string" ? data.hint.trim() : "";
    const solution = typeof data.solution === "string" ? data.solution.trim() : undefined;
    const code = typeof data.code === "string" ? data.code : undefined;

    if (!title || !codeforcesId) {
        throw new ApiError(400, "Title and Codeforces ID are required");
    }
    if (!allowedRatings.includes(rating)) {
        throw new ApiError(400, "Invalid CP rating");
    }
    if (!Number.isInteger(order) || order < 1) {
        throw new ApiError(400, "Order must be a positive integer");
    }

    const existingProblem = await CPProblem.findById(problemId);
    if (!existingProblem || !existingProblem.isActive) {
        throw new ApiError(404, "CP problem not found");
    }

    const duplicate = await CPProblem.findOne({
        codeforcesId,
        _id: { $ne: problemId },
    });
    if (duplicate) {
        throw new ApiError(409, "A problem with this Codeforces ID already exists");
    }

    existingProblem.title = title;
    existingProblem.codeforcesId = codeforcesId;
    existingProblem.rating = rating;
    existingProblem.order = order;
    existingProblem.hint = hint;
    if (solution !== undefined) existingProblem.solution = solution;
    if (code !== undefined) existingProblem.code = code;
    existingProblem.url = `https://codeforces.com/problemset/problem/${codeforcesId}`;

    await existingProblem.save();
    return existingProblem;
};


/* -------------------------------------------
   Delete CP Problem and its progress
-------------------------------------------- */

const deleteCPProblem = async (problemId) => {
    if (!mongoose.Types.ObjectId.isValid(problemId)) {
        throw new ApiError(400, "Invalid CP problem ID");
    }

    const problem = await CPProblem.findById(problemId);
    if (!problem) {
        throw new ApiError(404, "CP problem not found");
    }

    await CPProgress.deleteMany({ problem: problemId });
    await problem.deleteOne();
    return problem;
};


module.exports = {
    getCPSheet,
    createCPProblem,
    updateCPProblem,
    deleteCPProblem,
    markProblemComplete,
    markProblemIncomplete,
};
