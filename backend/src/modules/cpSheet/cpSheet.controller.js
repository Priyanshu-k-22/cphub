const {
    getCPSheet,
    markProblemComplete,
    markProblemIncomplete,
    createCPProblem,
    updateCPProblem,
    deleteCPProblem
} = require("./cpSheet.service.js");

const asyncHandler = require("../../middlewares/asyncHandler.js");
const ApiError  = require("../../utils/ApiError.js");


/*
|--------------------------------------------------------------------------
| Get CP Sheet
|--------------------------------------------------------------------------
| GET /api/cp-sheet
| GET /api/cp-sheet?rating=800
|
*/

const getCPSheetController = asyncHandler(
    async (req, res) => {
        const userId = req.user?._id;

        if (!userId) {
            throw new ApiError(
                401,
                "Unauthorized"
            );
        }

        const {
            rating,
            sheet = "beginner-cp",
        } = req.query;

        const allowedRatings = [
            800,
            900,
            1000,
            1100,
            1200,
        ];

        let parsedRating;

        if (rating !== undefined) {
            parsedRating = Number(rating);

            if (
                !allowedRatings.includes(
                    parsedRating
                )
            ) {
                throw new ApiError(
                    400,
                    "Invalid CP rating"
                );
            }
        }

        const data = await getCPSheet({
            userId,
            rating: parsedRating,
            sheet,
        });

        return res.status(200).json({
            statusCode: 200,
            data,
            message:
                "CP sheet fetched successfully",
            success: true,
        });
    }
);


/*
|--------------------------------------------------------------------------
| Mark Problem Complete
|--------------------------------------------------------------------------
| PATCH /api/cp-sheet/:problemId/complete
|
*/

const markProblemCompleteController =
    asyncHandler(async (req, res) => {
        const userId = req.user?._id;

        if (!userId) {
            throw new ApiError(
                401,
                "Unauthorized"
            );
        }

        const { problemId } = req.params;

        if (!problemId) {
            throw new ApiError(
                400,
                "Problem ID is required"
            );
        }

        const progress =
            await markProblemComplete({
                userId,
                problemId,
            });

        return res.status(200).json({
            statusCode: 200,
            data: progress,
            message:
                "Problem marked as completed",
            success: true,
        });
    });


/*
|--------------------------------------------------------------------------
| Mark Problem Incomplete
|--------------------------------------------------------------------------
| PATCH /api/cp-sheet/:problemId/incomplete
|
*/

const markProblemIncompleteController =
    asyncHandler(async (req, res) => {
        const userId = req.user?._id;

        if (!userId) {
            throw new ApiError(
                401,
                "Unauthorized"
            );
        }

        const { problemId } = req.params;

        if (!problemId) {
            throw new ApiError(
                400,
                "Problem ID is required"
            );
        }

        const progress =
            await markProblemIncomplete({
                userId,
                problemId,
            });

        return res.status(200).json({
            statusCode: 200,
            data: progress,
            message:
                "Problem marked as incomplete",
            success: true,
        });
    });

const createProblem = asyncHandler(
    async (req, res) => {

        const problem =
            await createCPProblem(req.body);

        return res.status(201).json({
            success: true,
            message:
                "CP problem created successfully",
            data: problem,
        });
    }
);

const updateProblemController = asyncHandler(
    async (req, res) => {
        const problem = await updateCPProblem(
            req.params.problemId,
            req.body
        );

        return res.status(200).json({
            success: true,
            message: "CP problem updated successfully",
            data: problem,
        });
    }
);

const deleteProblemController = asyncHandler(
    async (req, res) => {
        const problem = await deleteCPProblem(req.params.problemId);

        return res.status(200).json({
            success: true,
            message: "CP problem deleted successfully",
            data: { _id: problem._id },
        });
    }
);


module.exports = {
    getCPSheetController,
    markProblemCompleteController,
    markProblemIncompleteController,
    createProblem,
    updateProblemController,
    deleteProblemController,
};
