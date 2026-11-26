const PlatformSettings = require("./platformSettings.model");

const DEFAULT_GENERAL_SETTINGS = {
    platformName: "CpHub",
    platformDescription:
        "Smart DSA and Competitive Programming platform.",
    maintenanceMode: false,
    showMaintenanceMessage: true,
};

const DEFAULT_AUTHENTICATION_SETTINGS = {
    registrationsEnabled: true,
};

const DEFAULT_CONTENT_AVAILABILITY = {
    dailyProblems: true,
    cpSheet: true,
    dsaSheet: true,
    learningResources: true,
};

const DEFAULT_CONTEST_SETTINGS = {
    calendarEnabled: true,
    codeforcesSyncEnabled: true,
    sources: {
        codeforces: true,
        codechef: true,
        atcoder: true,
        leetcode: true,
    },
};

const DEFAULT_NOTIFICATION_SETTINGS = {
    announcementEnabled: false,
    announcementMessage: "",
    announcementType: "info",
};

const DEFAULT_SECURITY_SETTINGS = {
    studentSessionHours: 168,
    adminSessionHours: 24,
};

const getSettings = async () => {
    let settings = await PlatformSettings.findOne({
        key: "platform",
    })
        .select("+registrationsEnabled")
        .lean();

    /*
     * Create settings document if it doesn't exist.
     */
    if (!settings) {
        settings = await PlatformSettings.create({
            key: "platform",

            general: DEFAULT_GENERAL_SETTINGS,

            authentication:
                DEFAULT_AUTHENTICATION_SETTINGS,

            contentAvailability:
                DEFAULT_CONTENT_AVAILABILITY,

            contestSettings: DEFAULT_CONTEST_SETTINGS,

            notificationSettings: DEFAULT_NOTIFICATION_SETTINGS,

            securitySettings: DEFAULT_SECURITY_SETTINGS,
        });

        return settings.toObject();
    }

    const updates = {};
    const unset = {};

    /*
     * ----------------------------------------
     * Legacy migration
     * ----------------------------------------
     *
     * Old:
     *
     * registrationsEnabled
     *
     * New:
     *
     * authentication.registrationsEnabled
     */
    if (typeof settings.registrationsEnabled === "boolean") {
        if (
            typeof settings.authentication
                ?.registrationsEnabled !== "boolean"
        ) {
            updates[
                "authentication.registrationsEnabled"
            ] = settings.registrationsEnabled;
        }

        unset.registrationsEnabled = 1;
    }

    /*
     * ----------------------------------------
     * General defaults
     * ----------------------------------------
     */

    if (!settings.general?.platformName) {
        updates["general.platformName"] =
            DEFAULT_GENERAL_SETTINGS.platformName;
    }

    if (!settings.general?.platformDescription) {
        updates["general.platformDescription"] =
            DEFAULT_GENERAL_SETTINGS.platformDescription;
    }

    if (
        typeof settings.general?.maintenanceMode !==
        "boolean"
    ) {
        updates["general.maintenanceMode"] =
            DEFAULT_GENERAL_SETTINGS.maintenanceMode;
    }

    if (
        typeof settings.general
            ?.showMaintenanceMessage !== "boolean"
    ) {
        updates[
            "general.showMaintenanceMessage"
        ] =
            DEFAULT_GENERAL_SETTINGS
                .showMaintenanceMessage;
    }

    /*
     * ----------------------------------------
     * Authentication defaults
     * ----------------------------------------
     */

    if (
        typeof settings.authentication
            ?.registrationsEnabled !== "boolean"
    ) {
        updates[
            "authentication.registrationsEnabled"
        ] =
            DEFAULT_AUTHENTICATION_SETTINGS
                .registrationsEnabled;
    }

    for (const [module, enabled] of Object.entries(
        DEFAULT_CONTENT_AVAILABILITY
    )) {
        if (
            typeof settings.contentAvailability?.[module] !==
            "boolean"
        ) {
            updates[`contentAvailability.${module}`] =
                enabled;
        }
    }

    for (const [key, enabled] of Object.entries({
        calendarEnabled: DEFAULT_CONTEST_SETTINGS.calendarEnabled,
        codeforcesSyncEnabled: DEFAULT_CONTEST_SETTINGS.codeforcesSyncEnabled,
    })) {
        if (typeof settings.contestSettings?.[key] !== "boolean") {
            updates[`contestSettings.${key}`] = enabled;
        }
    }
    for (const [source, enabled] of Object.entries(DEFAULT_CONTEST_SETTINGS.sources)) {
        if (typeof settings.contestSettings?.sources?.[source] !== "boolean") {
            updates[`contestSettings.sources.${source}`] = enabled;
        }
    }

    for (const [key, value] of Object.entries(DEFAULT_NOTIFICATION_SETTINGS)) {
        if (typeof settings.notificationSettings?.[key] !== typeof value) {
            updates[`notificationSettings.${key}`] = value;
        }
    }

    const allowedSessionHours = [1, 6, 12, 24, 72, 168];
    if (!allowedSessionHours.includes(settings.securitySettings?.studentSessionHours)) {
        updates["securitySettings.studentSessionHours"] = DEFAULT_SECURITY_SETTINGS.studentSessionHours;
    }
    if (![1, 6, 12, 24].includes(settings.securitySettings?.adminSessionHours)) {
        updates["securitySettings.adminSessionHours"] = DEFAULT_SECURITY_SETTINGS.adminSessionHours;
    }

    /*
     * Apply migration/defaults if necessary.
     */
    if (
        Object.keys(updates).length ||
        Object.keys(unset).length
    ) {
        settings = await PlatformSettings.findOneAndUpdate(
            { key: "platform" },
            {
                ...(Object.keys(updates).length
                    ? { $set: updates }
                    : {}),

                ...(Object.keys(unset).length
                    ? { $unset: unset }
                    : {}),
            },
            {
                new: true,
            }
        )
            .select("+registrationsEnabled")
            .lean();
    }

    return settings;
};

/*
 * ----------------------------------------
 * General settings
 * ----------------------------------------
 */

const setGeneralSettings = async ({
    platformName,
    platformDescription,
    maintenanceMode,
    showMaintenanceMessage,
}) => {
    await getSettings();

    return PlatformSettings.findOneAndUpdate(
        { key: "platform" },

        {
            $set: {
                "general.platformName":
                    platformName,

                "general.platformDescription":
                    platformDescription,

                "general.maintenanceMode":
                    maintenanceMode,

                "general.showMaintenanceMessage":
                    showMaintenanceMessage,
            },
        },

        {
            new: true,
            runValidators: true,
        }
    ).lean();
};

/*
 * ----------------------------------------
 * Authentication settings
 * ----------------------------------------
 */

const setAuthenticationSettings = async ({
    registrationsEnabled,
}) => {
    await getSettings();

    return PlatformSettings.findOneAndUpdate(
        { key: "platform" },

        {
            $set: {
                "authentication.registrationsEnabled":
                    registrationsEnabled,
            },
        },

        {
            new: true,
            runValidators: true,
        }
    ).lean();
};

/*
 * ----------------------------------------
 * Content availability
 * ----------------------------------------
 */

const setContentAvailability = async (contentAvailability) => {
    await getSettings();

    return PlatformSettings.findOneAndUpdate(
        { key: "platform" },
        {
            $set: Object.fromEntries(
                Object.entries(contentAvailability).map(
                    ([module, enabled]) => [
                        `contentAvailability.${module}`,
                        enabled,
                    ]
                )
            ),
        },
        { new: true, runValidators: true }
    ).lean();
};

const setContestSettings = async ({ calendarEnabled, codeforcesSyncEnabled, sources }) => {
    await getSettings();
    const updates = {
        "contestSettings.calendarEnabled": calendarEnabled,
        "contestSettings.codeforcesSyncEnabled": codeforcesSyncEnabled,
        ...Object.fromEntries(Object.entries(sources).map(([source, enabled]) => [
            `contestSettings.sources.${source}`,
            enabled,
        ])),
    };
    return PlatformSettings.findOneAndUpdate(
        { key: "platform" },
        { $set: updates },
        { new: true, runValidators: true }
    ).lean();
};

const setNotificationSettings = async (notificationSettings) => {
    await getSettings();
    return PlatformSettings.findOneAndUpdate(
        { key: "platform" },
        { $set: Object.fromEntries(Object.entries(notificationSettings).map(([key, value]) => [
            `notificationSettings.${key}`,
            value,
        ])) },
        { new: true, runValidators: true }
    ).lean();
};

const setSecuritySettings = async (securitySettings) => {
    await getSettings();
    return PlatformSettings.findOneAndUpdate(
        { key: "platform" },
        { $set: {
            "securitySettings.studentSessionHours": securitySettings.studentSessionHours,
            "securitySettings.adminSessionHours": securitySettings.adminSessionHours,
        } },
        { new: true, runValidators: true }
    ).lean();
};

/*
 * ----------------------------------------
 * Legacy compatibility
 * ----------------------------------------
 *
 * Existing code can still call:
 *
 * setRegistrationStatus(true)
 */

const setRegistrationStatus = async (
    registrationsEnabled
) =>
    setAuthenticationSettings({
        registrationsEnabled,
    });

module.exports = {
    getSettings,
    setGeneralSettings,
    setAuthenticationSettings,
    setContentAvailability,
    setContestSettings,
    setNotificationSettings,
    setSecuritySettings,
    setRegistrationStatus,
};
