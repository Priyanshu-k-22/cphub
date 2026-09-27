const asyncHandler =
    require("../../middlewares/asyncHandler");

const ApiResponse =
    require("../../utils/ApiResponse");

const codeforcesService =
    require("./codeforces.service");


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


module.exports = {
    syncCodeforces,
    getCodeforces
};