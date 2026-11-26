const express = require("express");

const router =
    express.Router();

const {
    syncCodeforces,
    getCodeforces,
    startBulkSync,
    getBulkSyncStatus
} = require("./codeforces.controller");

const authMiddleware =
    require("../../middlewares/auth.middleware");
const requireAdmin =
    require("../../middlewares/admin.middleware");
const requireCodeforcesSync = require("../../middlewares/requireCodeforcesSync.middleware");
const codeforcesService =
    require("./codeforces.service");

const asyncHandler = require("../../middlewares/asyncHandler");
const ApiResponse = require("../../utils/ApiResponse");

router.get(
    "/test/:handle",
    asyncHandler(async (req, res) => {

        const data =
            await codeforcesService.fetchUserInfo(
                req.params.handle
            );

        return res.status(200).json(
            new ApiResponse(
                200,
                data,
                "Codeforces API working"
            )
        );
    })
);

router.post(
    "/sync",
    authMiddleware,
    requireCodeforcesSync,
    syncCodeforces
);

router.post(
    "/sync-all",
    authMiddleware,
    requireAdmin,
    requireCodeforcesSync,
    startBulkSync
);

router.get(
    "/sync-all/status",
    authMiddleware,
    requireAdmin,
    getBulkSyncStatus
);


router.get(
    "/",
    authMiddleware,
    getCodeforces
);


module.exports = router;
