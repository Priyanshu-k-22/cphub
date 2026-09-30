const express = require("express");

const router =
    express.Router();

const {
    getDashboard,
    getAdminDashboard,
} = require("./dashboard.controller");

const authMiddleware =
    require("../../middlewares/auth.middleware");
const requireAdmin =
    require("../../middlewares/admin.middleware");


router.get(
    "/",
    authMiddleware,
    getDashboard
);

router.get(
    "/admin",
    authMiddleware,
    requireAdmin,
    getAdminDashboard
);


module.exports = router;
