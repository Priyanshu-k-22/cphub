const asyncHandler = require("./asyncHandler");
const ApiError = require("../utils/ApiError");
const { getSettings } = require("../modules/settings/platformSettings.service");

const requireContentAvailability = (moduleOrResolver) => asyncHandler(async (req, _res, next) => {
    if (req.user?.role === "admin") return next();

    const moduleKey = typeof moduleOrResolver === "function"
        ? moduleOrResolver(req)
        : moduleOrResolver;
    const settings = await getSettings();

    if (settings.contentAvailability?.[moduleKey] === false) {
        throw new ApiError(403, "This learning module is temporarily unavailable");
    }

    return next();
});

module.exports = requireContentAvailability;
