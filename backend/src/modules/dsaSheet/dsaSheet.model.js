const mongoose = require("mongoose");

const dsaSheetSchema = new mongoose.Schema({
    title: { type: String, required: true, trim: true, maxlength: 160 },
    description: { type: String, default: "", trim: true, maxlength: 2000 },
    source: { type: String, required: true, trim: true, maxlength: 100 },
    url: { type: String, required: true, trim: true, maxlength: 500 },
    order: { type: Number, default: 0, min: 0 },
}, { timestamps: true });

dsaSheetSchema.index({ order: 1, title: 1 });
module.exports = mongoose.model("DSASheet", dsaSheetSchema);
