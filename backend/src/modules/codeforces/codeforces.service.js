const axios = require("axios");

const Codeforces = require("./codeforces.model");

const {
    countSolvedProblems,
    formatRatingHistory,
    getLastContest
} = require("./codeforces.utils");

const CODEFORCES_API = "https://codeforces.com/api";

const delay = (ms) =>
    new Promise((resolve) => setTimeout(resolve, ms));


const codeforcesRequest = async (method, params) => {

    const response = await axios.get(
        `${CODEFORCES_API}/${method}`,
        {
            params,
            timeout: 15000
        }
    );

    const data = response.data;

    if (data.status !== "OK") {
        throw new Error(
            data.comment || `Codeforces ${method} failed`
        );
    }

    return data.result;
};


/*
|--------------------------------------------------------------------------
| User Info
|--------------------------------------------------------------------------
*/

const fetchUserInfo = async (handle) => {

    return await codeforcesRequest(
        "user.info",
        {
            handles: handle
        }
    );
};


/*
|--------------------------------------------------------------------------
| Contest Rating History
|--------------------------------------------------------------------------
*/

const fetchUserRating = async (handle) => {

    return await codeforcesRequest(
        "user.rating",
        {
            handle
        }
    );
};


/*
|--------------------------------------------------------------------------
| User Submissions
|--------------------------------------------------------------------------
*/

const fetchUserSubmissions = async (handle) => {

    return await codeforcesRequest(
        "user.status",
        {
            handle
        }
    );
};


/*
|--------------------------------------------------------------------------
| Sync Codeforces Profile
|--------------------------------------------------------------------------
*/

const syncCodeforcesProfile = async ({
    userId,
    handle
}) => {

    /*
    |--------------------------------------------------------------------------
    | 1. User information
    |--------------------------------------------------------------------------
    */

    const userInfoResult =
        await fetchUserInfo(handle);


    if (
        !userInfoResult ||
        userInfoResult.length === 0
    ) {
        throw new Error(
            "Codeforces user not found"
        );
    }


    const userInfo =
        userInfoResult[0];


    /*
    |--------------------------------------------------------------------------
    | 2. Rating history
    |--------------------------------------------------------------------------
    */

    await delay(2100);

    const ratingHistory =
        await fetchUserRating(handle);


    /*
    |--------------------------------------------------------------------------
    | 3. Submissions
    |--------------------------------------------------------------------------
    */

    await delay(2100);

    const submissions =
        await fetchUserSubmissions(handle);


    /*
    |--------------------------------------------------------------------------
    | 4. Calculate solved problems
    |--------------------------------------------------------------------------
    */

    const solvedProblems =
        countSolvedProblems(
            submissions
        );


    /*
    |--------------------------------------------------------------------------
    | 5. Format rating history
    |--------------------------------------------------------------------------
    */

    const formattedHistory =
        formatRatingHistory(
            ratingHistory
        );


    /*
    |--------------------------------------------------------------------------
    | 6. Get latest contest
    |--------------------------------------------------------------------------
    */

    const lastContest =
        getLastContest(
            ratingHistory
        );


    /*
    |--------------------------------------------------------------------------
    | 7. Save / update MongoDB
    |--------------------------------------------------------------------------
    */

    const codeforces =
        await Codeforces.findOneAndUpdate(

            {
                user: userId
            },

            {
                user: userId,

                rating:
                    userInfo.rating ?? 0,

                maxRating:
                    userInfo.maxRating ?? 0,

                rank:
                    userInfo.rank ?? null,

                maxRank:
                    userInfo.maxRank ?? null,

                solvedProblems,

                contestCount:
                    ratingHistory.length,

                lastContest,

                ratingHistory:
                    formattedHistory,

                lastSyncedAt:
                    new Date()
            },

            {
                new: true,
                upsert: true,
                setDefaultsOnInsert: true
            }
        );


    return codeforces;
};


/*
|--------------------------------------------------------------------------
| Get Stored Codeforces Data
|--------------------------------------------------------------------------
*/

const getCodeforcesProfile = async (userId) => {

    return await Codeforces
        .findOne({
            user: userId
        })
        .lean();
};


module.exports = {
    fetchUserInfo,
    fetchUserRating,
    fetchUserSubmissions,
    syncCodeforcesProfile,
    getCodeforcesProfile
};