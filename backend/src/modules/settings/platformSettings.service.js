const PlatformSettings = require("./platformSettings.model");

const getSettings = async () => PlatformSettings.findOneAndUpdate(
    { key: "platform" },
    { $setOnInsert: { registrationsEnabled: true } },
    { new: true, upsert: true, setDefaultsOnInsert: true }
).lean();

const setRegistrationStatus = async (registrationsEnabled) => PlatformSettings.findOneAndUpdate(
    { key: "platform" },
    { $set: { registrationsEnabled } },
    { new: true, upsert: true, setDefaultsOnInsert: true }
).lean();

module.exports = { getSettings, setRegistrationStatus };
