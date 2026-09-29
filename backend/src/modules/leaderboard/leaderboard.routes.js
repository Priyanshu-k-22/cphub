const express = require("express");
const { list } = require("./leaderboard.controller");

const router = express.Router();
router.get("/", list);

module.exports = router;
