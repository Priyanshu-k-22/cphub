const mongoose = require("mongoose");


const codeforcesSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            unique: true,
            index: true
        },

        rating: {
            type: Number,
            default: 0
        },

        maxRating: {
            type: Number,
            default: 0
        },

        rank: {
            type: String,
            default: null
        },

        maxRank: {
            type: String,
            default: null
        },

        solvedProblems: {
            type: Number,
            default: 0
        },

        contestCount: {
            type: Number,
            default: 0
        },

        lastContest: {
            contestId: Number,
            contestName: String,
            rank: Number,
            oldRating: Number,
            newRating: Number,
            ratingChange: Number,
            date: Date
        },

        ratingHistory: [
            {
                contestId: Number,
                contestName: String,
                rank: Number,
                oldRating: Number,
                newRating: Number,
                ratingChange: Number,
                date: Date
            }
        ],

        lastSyncedAt: {
            type: Date,
            default: null
        }
    },

    {
        timestamps: true
    }
);


module.exports =
    mongoose.model(
        "Codeforces",
        codeforcesSchema
    );