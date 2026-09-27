const express = require("express");

const {
    getCPSheetController,
    createProblem,
    updateProblemController,
    deleteProblemController,
    markProblemCompleteController,
    markProblemIncompleteController,
}= require( "./cpSheet.controller.js");

const authMiddleware = require("../../middlewares/auth.middleware.js");
const requireAdmin = require("../../middlewares/admin.middleware.js");


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
    requireAdmin,
    createProblem
);

router.put(
    "/:problemId",
    authMiddleware,
    requireAdmin,
    updateProblemController
);

router.delete(
    "/:problemId",
    authMiddleware,
    requireAdmin,
    deleteProblemController
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
