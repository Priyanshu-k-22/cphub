const express = require("express");
const authenticate = require("../../middlewares/auth.middleware");
const requireAdmin = require("../../middlewares/admin.middleware");
const controller = require("./adminContent.controller");

const router = express.Router();
router.use(authenticate, requireAdmin);
router.get("/:kind", controller.list);
router.post("/:kind", controller.create);
router.put("/:kind/:id", controller.update);
router.delete("/:kind/:id", controller.remove);

module.exports = router;
