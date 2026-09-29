const express  =require("express");
const authenticate = require("../../middlewares/auth.middleware");
const requireAdmin = require("../../middlewares/admin.middleware");

const userController = require("./user.controller");

const validate = require("../../middlewares/validate.middleware");

const {
    updateProfileSchema
}  = require("./user.validation");

const router = express.Router();

router.get(
    "/admin",
    authenticate,
    requireAdmin,
    userController.getAllUsersAdmin
);

router.get(
    "/admin/progress",
    authenticate,
    requireAdmin,
    userController.getAdminUserProgress
);

router.get(
    "/admin/:userId",
    authenticate,
    requireAdmin,
    userController.getUserProfileAdmin
);

router.get(
    "/me", 
    authenticate, 
    userController.getMe
);

router.put(
    "/me", 
    authenticate, 
    validate(updateProfileSchema), 
    userController.updateMe
);

router.post(
    "/me/avatar",
    authenticate,
    userController.uploadAvatar
);

module.exports = router;
