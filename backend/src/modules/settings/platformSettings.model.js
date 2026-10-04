const mongoose = require("mongoose");

const generalSettingsSchema = new mongoose.Schema(
    {
        platformName: {
            type: String,
            default: "CpHub",
            trim: true,
            maxlength: 100,
        },

        platformDescription: {
            type: String,
            default:
                "Smart DSA and Competitive Programming platform.",
            trim: true,
            maxlength: 500,
        },

        maintenanceMode: {
            type: Boolean,
            default: false,
        },

        showMaintenanceMessage: {
            type: Boolean,
            default: true,
        },
    },
    { _id: false }
);

const authenticationSettingsSchema = new mongoose.Schema(
    {
        registrationsEnabled: {
            type: Boolean,
            default: true,
        },
    },
    { _id: false }
);

const platformSettingsSchema = new mongoose.Schema(
    {
        key: {
            type: String,
            unique: true,
            default: "platform",
        },

        general: {
            type: generalSettingsSchema,
            default: () => ({}),
        },

        authentication: {
            type: authenticationSettingsSchema,
            default: () => ({}),
        },

        /*
         * Legacy field.
         *
         * Existing MongoDB documents may still have:
         *
         * registrationsEnabled: false
         *
         * The service migrates this value into:
         *
         * authentication.registrationsEnabled
         */
        registrationsEnabled: {
            type: Boolean,
            default: undefined,
            select: false,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model(
    "PlatformSettings",
    platformSettingsSchema
);