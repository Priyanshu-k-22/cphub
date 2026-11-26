const asyncHandler = require("../../middlewares/asyncHandler");
const ApiResponse = require("../../utils/ApiResponse");

const authSrevice = require("./auth.service");


/*
|--------------------------------------------------------------------------
| Register
|--------------------------------------------------------------------------
*/

const register = asyncHandler(async (req, res) => {
    const {
        username,
        email,
        password
    } = req.body;

    const user = await authSrevice.registerUser({
        username,
        email,
        password
    });

    return res.status(201).json(
        new ApiResponse(
            201,
            user,
            "User Registered successfully"
        )
    );
});


/*
|--------------------------------------------------------------------------
| Login
|--------------------------------------------------------------------------
*/

const login = asyncHandler(async (req, res) => {
    const {
        email,
        password
    } = req.body;

    const {
        user,
        token,
        sessionDurationHours
    } = await authSrevice.loginUser({
        email,
        password
    });

    const isProduction =
        process.env.NODE_ENV === "production";

    return res
        .status(200)
        .cookie(
            "accessToken",
            token,
            {
                httpOnly: true,

                // HTTPS is required in production
                secure: isProduction,

                // Required when frontend/backend
                // are on different sites
                sameSite: isProduction
                    ? "none"
                    : "lax",

                // Make cookie available to
                // the complete backend
                path: "/",

                maxAge: sessionDurationHours * 60 * 60 * 1000
            }
        )
        .json(
            new ApiResponse(
                200,
                { user },
                "Login Successful"
            )
        );
});


/*
|--------------------------------------------------------------------------
| Current User
|--------------------------------------------------------------------------
*/

const getCurrentUser = asyncHandler(
    async (req, res) => {

        return res.status(200).json(
            new ApiResponse(
                200,
                req.user,
                "Current user fetched successfully"
            )
        );
    }
);


/*
|--------------------------------------------------------------------------
| Logout
|--------------------------------------------------------------------------
*/

const logout = asyncHandler(
    async (req, res) => {

        const isProduction =
            process.env.NODE_ENV === "production";

        return res
            .status(200)
            .clearCookie(
                "accessToken",
                {
                    httpOnly: true,

                    secure: isProduction,

                    sameSite: isProduction
                        ? "none"
                        : "lax",

                    path: "/"
                }
            )
            .json(
                new ApiResponse(
                    200,
                    null,
                    "Logout successful"
                )
            );
    }
);


module.exports = {
    register,
    login,
    getCurrentUser,
    logout,
};
