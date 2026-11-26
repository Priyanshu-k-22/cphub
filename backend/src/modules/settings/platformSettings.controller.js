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

const contentAvailabilitySchema = z.object({
    dailyProblems: z.boolean(),
    cpSheet: z.boolean(),
    dsaSheet: z.boolean(),
    learningResources: z.boolean(),
}).strict();

const contestSettingsSchema = z.object({
    calendarEnabled: z.boolean(),
    codeforcesSyncEnabled: z.boolean(),
    sources: z.object({
        codeforces: z.boolean(),
        codechef: z.boolean(),
        atcoder: z.boolean(),
        leetcode: z.boolean(),
    }).strict(),
}).strict();

const notificationSettingsSchema = z.object({
    announcementEnabled: z.boolean(),
    announcementMessage: z.string().trim().max(240),
    announcementType: z.enum(["info", "success", "warning"]),
}).strict().refine((settings) => !settings.announcementEnabled || settings.announcementMessage.length > 0, {
    message: "Enter an announcement before publishing it",
    path: ["announcementMessage"],
});

const securitySettingsSchema = z.object({
    studentSessionHours: z.union([z.literal(1), z.literal(6), z.literal(12), z.literal(24), z.literal(72), z.literal(168)]),
    adminSessionHours: z.union([z.literal(1), z.literal(6), z.literal(12), z.literal(24)]),
}).strict();

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

                    contentAvailability:
                        settings.contentAvailability,

                    contestSettings:
                        settings.contestSettings,

                    notifications: settings.notificationSettings,
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

const getContentAvailability = asyncHandler(
    async (_req, res) => {
        const settings = await settingsService.getSettings();
        return res.status(200).json(
            new ApiResponse(
                200,
                settings.contentAvailability,
                "Content availability fetched"
            )
        );
    }
);

const updateContentAvailability = asyncHandler(
    async (req, res) => {
        const parsed = contentAvailabilitySchema.safeParse(
            req.body
        );

        if (!parsed.success) {
            throw new ApiError(
                400,
                "Invalid content availability settings",
                parsed.error.flatten()
            );
        }

        const settings =
            await settingsService.setContentAvailability(
                parsed.data
            );

        return res.status(200).json(
            new ApiResponse(
                200,
                settings.contentAvailability,
                "Content availability saved"
            )
        );
    }
);

const getContestSettings = asyncHandler(async (_req, res) => {
    const settings = await settingsService.getSettings();
    return res.status(200).json(new ApiResponse(200, settings.contestSettings, "Contest settings fetched"));
});

const updateContestSettings = asyncHandler(async (req, res) => {
    const parsed = contestSettingsSchema.safeParse(req.body);
    if (!parsed.success) {
        throw new ApiError(400, "Invalid contest settings", parsed.error.flatten());
    }
    const settings = await settingsService.setContestSettings(parsed.data);
    return res.status(200).json(new ApiResponse(200, settings.contestSettings, "Contest settings saved"));
});

const getNotificationSettings = asyncHandler(async (_req, res) => {
    const settings = await settingsService.getSettings();
    return res.status(200).json(new ApiResponse(200, settings.notificationSettings, "Notification settings fetched"));
});

const updateNotificationSettings = asyncHandler(async (req, res) => {
    const parsed = notificationSettingsSchema.safeParse(req.body);
    if (!parsed.success) {
        throw new ApiError(400, "Invalid notification settings", parsed.error.flatten());
    }
    const settings = await settingsService.setNotificationSettings(parsed.data);
    return res.status(200).json(new ApiResponse(200, settings.notificationSettings, "Notification settings saved"));
});

const getSecuritySettings = asyncHandler(async (_req, res) => {
    const settings = await settingsService.getSettings();
    return res.status(200).json(new ApiResponse(200, settings.securitySettings, "Security settings fetched"));
});

const updateSecuritySettings = asyncHandler(async (req, res) => {
    const parsed = securitySettingsSchema.safeParse(req.body);
    if (!parsed.success) {
        throw new ApiError(400, "Invalid security settings", parsed.error.flatten());
    }
    const settings = await settingsService.setSecuritySettings(parsed.data);
    return res.status(200).json(new ApiResponse(200, settings.securitySettings, "Security settings saved"));
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

    getContentAvailability,
    updateContentAvailability,

    getContestSettings,
    updateContestSettings,

    getNotificationSettings,
    updateNotificationSettings,

    getSecuritySettings,
    updateSecuritySettings,

    updateAdminSettings,
};
