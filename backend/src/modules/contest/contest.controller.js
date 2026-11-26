const asyncHandler = require("../../middlewares/asyncHandler");
const ApiResponse = require("../../utils/ApiResponse");
const settingsService = require("../settings/platformSettings.service");

const {
    getContests
} = require("./contest.service");


/*
|--------------------------------------------------------------------------
| Get Contests
|--------------------------------------------------------------------------
*/

const getAllContests = asyncHandler(
    async (req, res) => {

        const {
            category
        } = req.query;

        const settings = await settingsService.getSettings();

        const contests = await getContests({
            category,
            contestSettings: settings.contestSettings,
        });

        return res.status(200).json(
            new ApiResponse(
                200,
                contests,
                "Contests fetched successfully"
            )
        );
    }
);


module.exports = {
    getAllContests
};
