const mongoose = require("mongoose");

const dailyProblemProgressSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    problem: { type: mongoose.Schema.Types.ObjectId, ref: "Problem", required: true },
    solved: { type: Boolean, default: false },
    solvedAt: { type: Date, default: null },
}, { timestamps: true });

dailyProblemProgressSchema.index({ user: 1, problem: 1 }, { unique: true });

module.exports = mongoose.model("DailyProblemProgress", dailyProblemProgressSchema);
