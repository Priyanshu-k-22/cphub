const getProblemKey = (problem) => {

    if (
        !problem ||
        !problem.contestId ||
        !problem.index
    ) {
        return null;
    }

    return `${problem.contestId}-${problem.index}`;
};


const countSolvedProblems = (submissions) => {

    const solved = new Set();


    for (const submission of submissions) {

        if (submission.verdict !== "OK") {
            continue;
        }


        const problemKey =
            getProblemKey(
                submission.problem
            );


        if (problemKey) {
            solved.add(problemKey);
        }
    }


    return solved.size;
};


const formatRatingHistory = (
    ratingHistory
) => {

    return ratingHistory.map(
        (contest) => ({

            contestId:
                contest.contestId,

            contestName:
                contest.contestName,

            rank:
                contest.rank,

            oldRating:
                contest.oldRating,

            newRating:
                contest.newRating,

            ratingChange:
                contest.newRating -
                contest.oldRating,

            date:
                new Date(
                    contest.ratingUpdateTimeSeconds *
                    1000
                )
        })
    );
};


const getLastContest = (
    ratingHistory
) => {

    if (
        !ratingHistory ||
        ratingHistory.length === 0
    ) {
        return null;
    }


    const contest =
        ratingHistory[
            ratingHistory.length - 1
        ];


    return {

        contestId:
            contest.contestId,

        contestName:
            contest.contestName,

        rank:
            contest.rank,

        oldRating:
            contest.oldRating,

        newRating:
            contest.newRating,

        ratingChange:
            contest.newRating -
            contest.oldRating,

        date:
            new Date(
                contest.ratingUpdateTimeSeconds *
                1000
            )
    };
};


module.exports = {
    getProblemKey,
    countSolvedProblems,
    formatRatingHistory,
    getLastContest
};