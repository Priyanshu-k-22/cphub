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
    setRegistrationStatus,
};