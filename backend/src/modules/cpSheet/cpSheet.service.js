const CPProblem = require("./cpProblem.model.js");
const CPProgress = require("./cpProgress.model.js");

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
        sheet,
        isActive: true,
    });


    return problem;
};


module.exports = {
    getCPSheet,
    createCPProblem,
    markProblemComplete,
    markProblemIncomplete,
};