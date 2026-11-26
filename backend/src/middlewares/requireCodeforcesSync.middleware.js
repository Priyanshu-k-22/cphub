const asyncHandler = require("./asyncHandler");
const ApiError = require("../utils/ApiError");
const { getSettings } = require("../modules/settings/platformSettings.service");

module.exports = asyncHandler(async (_req, _res, next) => {
    const settings = await getSettings();
    if (settings.contestSettings?.codeforcesSyncEnabled === false) {
        throw new ApiError(403, "Codeforces profile syncing is temporarily disabled by an administrator");
    }
    return next();
});
