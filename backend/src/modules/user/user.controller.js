const asyncHandler = require("../../middlewares/asyncHandler");
const ApiResponse = require("../../utils/ApiResponse");

const userService = require("./user.service");

const getMe = asyncHandler(async(req, res)=>{

    const user = await userService.getCurrentUser(req.user._id);

    return res.status(200).json(
        new ApiResponse(200, 
            user,
            "User Profile fetched successfully"
        )
    );
});

const updateMe = asyncHandler(async (req, res) => {
    const user = await userService.updateProfile(
        req.user._id,
        req.body
    );

    return res.status(200).json(
        new ApiResponse(
            200,
            user,
            "User profile updated successfully"
        )
    );
});

const getAllUsersAdmin = asyncHandler(async (req, res) => {
    const result = await userService.listUsersForAdmin({
        page: req.query.page,
        limit: req.query.limit,
        search: typeof req.query.search === "string" ? req.query.search : "",
    });

    return res.status(200).json(
        new ApiResponse(200, result, "Users fetched successfully")
    );
});

const getUserProfileAdmin = asyncHandler(async (req, res) => {
    const profile = await userService.getUserAdminProfile(req.params.userId);

    return res.status(200).json(
        new ApiResponse(200, profile, "User profile fetched successfully")
    );
});

module.exports = {
    getMe,
    updateMe,
    getAllUsersAdmin,
    getUserProfileAdmin,
};
