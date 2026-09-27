const express = require("express");

const {
    getCPSheetController,
    createProblem,
    markProblemCompleteController,
    markProblemIncompleteController,
}= require( "./cpSheet.controller.js");

const authMiddleware = require("../../middlewares/auth.middleware.js");


const router = express.Router();


/*
|--------------------------------------------------------------------------
| CP Sheet
|--------------------------------------------------------------------------
*/

// Get all CP problems
// Optional: ?rating=800

router.get(
    "/",
    authMiddleware,
    getCPSheetController
);

router.post(
    "/",
    authMiddleware,
    createProblem
);

/*
|--------------------------------------------------------------------------
| Problem Progress
|--------------------------------------------------------------------------
*/

// Mark solved

router.patch(
    "/:problemId/complete",
    authMiddleware,
    markProblemCompleteController
);


// Mark unsolved

router.patch(
    "/:problemId/incomplete",
    authMiddleware,
    markProblemIncompleteController
);


module.exports = router;