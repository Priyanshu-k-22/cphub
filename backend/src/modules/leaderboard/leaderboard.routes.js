const express = require("express");
const { list } = require("./leaderboard.controller");
const requireContentAvailability = require("../../middlewares/contentAvailability.middleware");

const router = express.Router();
router.get("/", requireContentAvailability((req) => ({
    "cp-sheet": "cpSheet",
    "dsa-sheet": "dsaSheet",
    "daily-problem": "dailyProblems",
}[req.query.type] || "leaderboard")), list);

module.exports = router;
