const mongoose = require("mongoose");

const cpProblemSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },

        codeforcesId: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },

        slug: {
            type: String,
            trim: true,
        },

        rating: {
            type: Number,
            required: true,
            enum: [800, 900, 1000, 1100, 1200],
        },

        url: {
            type: String,
            required: true,
            trim: true,
        },

        order: {
            type: Number,
            required: true,
        },
        hint: {
            type: String,
            trim: true,
            default: "",
        },

        solution: {
            type: String,
            trim: true,
            default: "",
        },

        code: {
            type: String,
            default: "",
        },

        sheet: {
            type: String,
            default: "beginner-cp",
            index: true,
        },

        isActive: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    }
);

cpProblemSchema.index({
    rating: 1,
    order: 1,
});

module.exports =  mongoose.model(
    "CPProblem",
    cpProblemSchema
);
