const express = require("express");
const authenticate = require("../../middlewares/auth.middleware");
const requireAdmin = require("../../middlewares/admin.middleware");
const controller = require("./platformSettings.controller");

const router = express.Router();
router.get("/public", controller.getPublicSettings);
router.get("/admin", authenticate, requireAdmin, controller.getAdminSettings);
router.put("/admin", authenticate, requireAdmin, controller.updateAdminSettings);

module.exports = router;
