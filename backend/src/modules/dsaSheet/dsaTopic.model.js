const mongoose = require("mongoose");

const dsaTopicSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true, maxlength: 80 },
    slug: { type: String, required: true, trim: true, lowercase: true, maxlength: 100, unique: true },
    description: { type: String, default: "", trim: true, maxlength: 1000 },
    order: { type: Number, required: true, min: 0, default: 0 },
    isActive: { type: Boolean, default: true, index: true },
}, { timestamps: true });

dsaTopicSchema.index({ order: 1, name: 1 });
module.exports = mongoose.model("DSATopic", dsaTopicSchema);
