const asyncHandler =
    require("../../middlewares/asyncHandler");

const ApiResponse =
    require("../../utils/ApiResponse");

const User =
    require("../user/user.model");

const codeforcesService =
    require("../codeforces/codeforces.service");


const getDashboard =
    asyncHandler(async (req, res) => {

        const user =
            await User.findById(
                req.user._id
            )
            .select(
                "username codeforcesHandle profile"
            )
            .lean();


        if (!user) {

            return res.status(404).json(
                new ApiResponse(
                    404,
                    null,
                    "User not found"
                )
            );
        }


        let codeforces = null;


        if (user.codeforcesHandle) {

            codeforces =
                await codeforcesService
                    .getCodeforcesProfile(
                        req.user._id
                    );
        }


        return res.status(200).json(
            new ApiResponse(
                200,

                {
                    user: {
                        username:
                            user.username,

                        profile:
                            user.profile
                    },

                    codeforces
                },

                "Dashboard fetched successfully"
            )
        );
    });


module.exports = {
    getDashboard
};