const asyncHandler = require("../../middlewares/asyncHandler");
const ApiResponse = require("../../utils/ApiResponse");

const userService = require("./user.service");
const ApiError = require("../../utils/ApiError");

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

const uploadAvatar = asyncHandler(async (req, res) => {
    if (!Buffer.isBuffer(req.body) || req.body.length === 0) {
        throw new ApiError(400, "Choose a photo to upload");
    }

    const contentType = req.get("content-type")?.split(";")[0]?.toLowerCase();
    const allowedTypes = new Set([
        "image/jpeg",
        "image/png",
        "image/webp",
        "image/gif",
        "image/avif",
    ]);
    if (!allowedTypes.has(contentType)) {
        throw new ApiError(415, "Use a JPEG, PNG, WebP, GIF, or AVIF image");
    }

    const user = await userService.uploadAvatar(
        req.user._id,
        req.body,
        contentType
    );

    return res.status(200).json(
        new ApiResponse(200, user, "Profile photo uploaded successfully")
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

const getAdminUserProgress = asyncHandler(async (req, res) => {
    const progress = await userService.getAdminUserProgress({ page: req.query.page, limit: req.query.limit });
    return res.status(200).json(new ApiResponse(200, progress, "User progress fetched successfully"));
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
    uploadAvatar,
    getAllUsersAdmin,
    getAdminUserProgress,
    getUserProfileAdmin,
};
