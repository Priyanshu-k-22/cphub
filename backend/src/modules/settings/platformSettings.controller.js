const { z } = require("zod");
const asyncHandler = require("../../middlewares/asyncHandler");
const ApiError = require("../../utils/ApiError");
const ApiResponse = require("../../utils/ApiResponse");
const settingsService = require("./platformSettings.service");

const getPublicSettings = asyncHandler(async (_req, res) => {
    const settings = await settingsService.getSettings();
    return res.status(200).json(new ApiResponse(200, {
        registrationsEnabled: settings.registrationsEnabled,
    }, "Platform settings fetched"));
});

const getAdminSettings = asyncHandler(async (_req, res) => {
    const settings = await settingsService.getSettings();
    return res.status(200).json(new ApiResponse(200, settings, "Platform settings fetched"));
});

const updateAdminSettings = asyncHandler(async (req, res) => {
    const parsed = z.object({ registrationsEnabled: z.boolean() }).safeParse(req.body);
    if (!parsed.success) throw new ApiError(400, "Invalid platform settings", parsed.error.flatten());
    const settings = await settingsService.setRegistrationStatus(parsed.data.registrationsEnabled);
    return res.status(200).json(new ApiResponse(200, settings, "Platform settings saved"));
});

module.exports = { getPublicSettings, getAdminSettings, updateAdminSettings };
