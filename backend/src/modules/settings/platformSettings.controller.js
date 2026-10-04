const { z } = require("zod");

const asyncHandler = require("../../middlewares/asyncHandler");
const ApiError = require("../../utils/ApiError");
const ApiResponse = require("../../utils/ApiResponse");

const settingsService = require(
    "./platformSettings.service"
);

/*
 * ----------------------------------------
 * Validation schemas
 * ----------------------------------------
 */

const generalSettingsSchema = z.object({
    platformName: z
        .string()
        .trim()
        .min(1)
        .max(100),

    platformDescription: z
        .string()
        .trim()
        .max(500),

    maintenanceMode: z.boolean(),

    showMaintenanceMessage: z.boolean(),
});

const authenticationSettingsSchema = z.object({
    registrationsEnabled: z.boolean(),
});

/*
 * ----------------------------------------
 * Public settings
 * ----------------------------------------
 */

const getPublicSettings = asyncHandler(
    async (_req, res) => {
        const settings =
            await settingsService.getSettings();

        return res.status(200).json(
            new ApiResponse(
                200,

                {
                    general: {
                        platformName:
                            settings.general
                                .platformName,

                        platformDescription:
                            settings.general
                                .platformDescription,

                        maintenanceMode:
                            settings.general
                                .maintenanceMode,

                        showMaintenanceMessage:
                            settings.general
                                .showMaintenanceMessage,
                    },

                    authentication: {
                        registrationsEnabled:
                            settings
                                .authentication
                                .registrationsEnabled,
                    },
                },

                "Platform settings fetched"
            )
        );
    }
);

/*
 * ----------------------------------------
 * All admin settings
 * ----------------------------------------
 */

const getAdminSettings = asyncHandler(
    async (_req, res) => {
        const settings =
            await settingsService.getSettings();

        return res.status(200).json(
            new ApiResponse(
                200,
                settings,
                "Platform settings fetched"
            )
        );
    }
);

/*
 * ----------------------------------------
 * General
 * ----------------------------------------
 */

const getGeneralSettings = asyncHandler(
    async (_req, res) => {
        const settings =
            await settingsService.getSettings();

        return res.status(200).json(
            new ApiResponse(
                200,
                settings.general,
                "General settings fetched"
            )
        );
    }
);

const updateGeneralSettings = asyncHandler(
    async (req, res) => {
        const parsed =
            generalSettingsSchema.safeParse(
                req.body
            );

        if (!parsed.success) {
            throw new ApiError(
                400,
                "Invalid general settings",
                parsed.error.flatten()
            );
        }

        const settings =
            await settingsService.setGeneralSettings(
                parsed.data
            );

        return res.status(200).json(
            new ApiResponse(
                200,
                settings.general,
                "General settings saved"
            )
        );
    }
);

/*
 * ----------------------------------------
 * Authentication
 * ----------------------------------------
 */

const getAuthenticationSettings =
    asyncHandler(async (_req, res) => {
        const settings =
            await settingsService.getSettings();

        return res.status(200).json(
            new ApiResponse(
                200,

                settings.authentication,

                "Authentication settings fetched"
            )
        );
    });

const updateAuthenticationSettings =
    asyncHandler(async (req, res) => {
        const parsed =
            authenticationSettingsSchema.safeParse(
                req.body
            );

        if (!parsed.success) {
            throw new ApiError(
                400,
                "Invalid authentication settings",
                parsed.error.flatten()
            );
        }

        const settings =
            await settingsService.setAuthenticationSettings(
                parsed.data
            );

        return res.status(200).json(
            new ApiResponse(
                200,

                settings.authentication,

                "Authentication settings saved"
            )
        );
    });

/*
 * ----------------------------------------
 * Legacy endpoint
 * ----------------------------------------
 *
 * Existing frontend currently uses:
 *
 * PUT /settings/admin
 *
 * Keep it temporarily so nothing breaks.
 */

const updateAdminSettings = asyncHandler(
    async (req, res) => {
        const parsed =
            authenticationSettingsSchema.safeParse(
                req.body
            );

        if (!parsed.success) {
            throw new ApiError(
                400,
                "Invalid platform settings",
                parsed.error.flatten()
            );
        }

        const settings =
            await settingsService.setAuthenticationSettings(
                parsed.data
            );

        return res.status(200).json(
            new ApiResponse(
                200,
                settings,
                "Platform settings saved"
            )
        );
    }
);

module.exports = {
    getPublicSettings,
    getAdminSettings,

    getGeneralSettings,
    updateGeneralSettings,

    getAuthenticationSettings,
    updateAuthenticationSettings,

    updateAdminSettings,
};