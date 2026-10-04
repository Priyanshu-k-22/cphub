const express = require("express");

const authenticate = require(
    "../../middlewares/auth.middleware"
);

const requireAdmin = require(
    "../../middlewares/admin.middleware"
);

const controller = require(
    "./platformSettings.controller"
);

const router = express.Router();

/*
 * ========================================
 * PUBLIC
 * ========================================
 */

router.get(
    "/public",
    controller.getPublicSettings
);

/*
 * ========================================
 * ADMIN
 * ========================================
 */

/*
 * All settings
 */
router.get(
    "/admin",
    authenticate,
    requireAdmin,
    controller.getAdminSettings
);

/*
 * ----------------------------------------
 * General
 * ----------------------------------------
 */

router.get(
    "/admin/general",
    authenticate,
    requireAdmin,
    controller.getGeneralSettings
);

router.put(
    "/admin/general",
    authenticate,
    requireAdmin,
    controller.updateGeneralSettings
);

/*
 * ----------------------------------------
 * Authentication
 * ----------------------------------------
 */

router.get(
    "/admin/authentication",
    authenticate,
    requireAdmin,
    controller.getAuthenticationSettings
);

router.put(
    "/admin/authentication",
    authenticate,
    requireAdmin,
    controller.updateAuthenticationSettings
);

/*
 * ----------------------------------------
 * Legacy
 * ----------------------------------------
 *
 * Keep temporarily for the current frontend.
 */

router.put(
    "/admin",
    authenticate,
    requireAdmin,
    controller.updateAdminSettings
);

module.exports = router;