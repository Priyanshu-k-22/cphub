const mongoose = require("mongoose");

const dsaProblemSchema = new mongoose.Schema({
    topic: { type: mongoose.Schema.Types.ObjectId, ref: "DSATopic", required: true, index: true },
    title: { type: String, required: true, trim: true, maxlength: 180 },
    url: { type: String, required: true, trim: true, maxlength: 600 },
    platform: { type: String, required: true, trim: true, maxlength: 60, default: "Other" },
    difficulty: { type: String, required: true, enum: ["Easy", "Medium", "Hard"] },
    order: { type: Number, required: true, min: 1 },
    hint: { type: String, default: "", trim: true, maxlength: 2000 },
}, { timestamps: true });

dsaProblemSchema.index({ topic: 1, order: 1, _id: 1 });
module.exports = mongoose.model("DSAProblem", dsaProblemSchema);
