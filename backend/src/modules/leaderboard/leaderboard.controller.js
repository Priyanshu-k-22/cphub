const asyncHandler = require("../../middlewares/asyncHandler");
const ApiResponse = require("../../utils/ApiResponse");
const { getLeaderboard } = require("./leaderboard.service");

const list = asyncHandler(async (req, res) => {
    const result = await getLeaderboard(req.query);
    return res.status(200).json(new ApiResponse(200, result, "Leaderboard fetched successfully"));
});

module.exports = { list };
