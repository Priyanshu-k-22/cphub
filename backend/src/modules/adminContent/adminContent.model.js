const mongoose = require("mongoose");

const adminContentSchema = new mongoose.Schema({
    kind: {
        type: String,
        required: true,
        enum: ["ctc", "interview", "systemDesign", "miscellaneous"],
        index: true,
    },
    title: { type: String, required: true, trim: true, maxlength: 160 },
    description: { type: String, default: "", trim: true, maxlength: 4000 },
    category: { type: String, default: "", trim: true, maxlength: 80 },
    url: { type: String, default: "", trim: true, maxlength: 500 },
    author: { type: String, default: "", trim: true, maxlength: 100 },
    difficulty: { type: String, default: "", trim: true, maxlength: 40 },
    status: { type: String, enum: ["draft", "published"], default: "published" },
}, { timestamps: true });

adminContentSchema.index({ kind: 1, updatedAt: -1 });

module.exports = mongoose.model("AdminContent", adminContentSchema);
