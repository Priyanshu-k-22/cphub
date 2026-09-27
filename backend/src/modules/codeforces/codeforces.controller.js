const asyncHandler =
    require("../../middlewares/asyncHandler");

const ApiResponse =
    require("../../utils/ApiResponse");

const codeforcesService =
    require("./codeforces.service");
const bulkSyncService =
    require("./bulkSync.service");

/*
|--------------------------------------------------------------------------
| Sync Codeforces
|--------------------------------------------------------------------------
*/

const syncCodeforces = asyncHandler(
    async (req, res) => {

        const userId =
            req.user._id;

        const handle =
            req.user.username;


        const data =
            await codeforcesService
                .syncCodeforcesProfile({
                    userId,
                    handle
                });


        return res.status(200).json(
            new ApiResponse(
                200,
                data,
                "Codeforces profile synced successfully"
            )
        );
    }
);


/*
|--------------------------------------------------------------------------
| Get Codeforces Data
|--------------------------------------------------------------------------
*/

const getCodeforces =
    asyncHandler(
        async (req, res) => {

            const data =
                await codeforcesService
                    .getCodeforcesProfile(
                        req.user._id
                    );


            return res.status(200).json(
                new ApiResponse(
                    200,
                    data,
                    "Codeforces profile fetched successfully"
                )
            );
        }
    );

const startBulkSync = asyncHandler(async (req, res) => {
    const job = await bulkSyncService.startBulkSync();

    return res.status(202).json(
        new ApiResponse(202, job, "Codeforces sync started for all users")
    );
});

const getBulkSyncStatus = asyncHandler(async (req, res) => {
    const job = bulkSyncService.getBulkSyncStatus();

    return res.status(200).json(
        new ApiResponse(200, job, "Codeforces sync status fetched")
    );
});


module.exports = {
    syncCodeforces,
    getCodeforces,
    startBulkSync,
    getBulkSyncStatus,
};
