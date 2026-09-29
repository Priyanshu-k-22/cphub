const mongoose = require("mongoose");

const platformSettingsSchema = new mongoose.Schema({
    key: { type: String, unique: true, default: "platform" },
    registrationsEnabled: { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model("PlatformSettings", platformSettingsSchema);
