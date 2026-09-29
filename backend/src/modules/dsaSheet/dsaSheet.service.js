const mongoose = require("mongoose");
const ApiError = require("../../utils/ApiError");
const DSASheet = require("./dsaSheet.model");

const normalizeInput = (data = {}) => {
    const title = typeof data.title === "string" ? data.title.trim() : "";
    const description = typeof data.description === "string" ? data.description.trim() : "";
    const source = typeof data.source === "string" ? data.source.trim() : "";
    const url = typeof data.url === "string" ? data.url.trim() : "";
    const order = data.order === undefined || data.order === "" ? 0 : Number(data.order);
    if (!title) throw new ApiError(400, "Sheet title is required");
    if (!source) throw new ApiError(400, "Sheet source is required");
    try {
        const parsed = new URL(url);
        if (!["http:", "https:"].includes(parsed.protocol)) throw new Error("Unsupported protocol");
    } catch { throw new ApiError(400, "Enter a valid http or https URL"); }
    if (!Number.isInteger(order) || order < 0) throw new ApiError(400, "Order must be a non-negative integer");
    return { title, description, source, url, order };
};

const listDSASheets = async () => DSASheet.find().sort({ order: 1, title: 1, _id: 1 }).lean();
const createDSASheet = async (data) => DSASheet.create(normalizeInput(data));
const updateDSASheet = async (id, data) => {
    if (!mongoose.Types.ObjectId.isValid(id)) throw new ApiError(400, "Invalid DSA sheet ID");
    const sheet = await DSASheet.findByIdAndUpdate(id, { $set: normalizeInput(data) }, { new: true, runValidators: true });
    if (!sheet) throw new ApiError(404, "DSA sheet not found");
    return sheet;
};
const deleteDSASheet = async (id) => {
    if (!mongoose.Types.ObjectId.isValid(id)) throw new ApiError(400, "Invalid DSA sheet ID");
    const sheet = await DSASheet.findByIdAndDelete(id);
    if (!sheet) throw new ApiError(404, "DSA sheet not found");
    return sheet;
};

module.exports = { listDSASheets, createDSASheet, updateDSASheet, deleteDSASheet };
