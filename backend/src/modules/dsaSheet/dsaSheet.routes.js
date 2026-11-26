const express = require("express");
const authenticate = require("../../middlewares/auth.middleware");
const requireAdmin = require("../../middlewares/admin.middleware");
const requireContentAvailability = require("../../middlewares/contentAvailability.middleware");
const catalog = require("./dsaSheet.controller");
const practice = require("./dsaPractice.controller");

const router = express.Router();
router.use(authenticate);

// Existing external resource catalog.
router.get("/", requireContentAvailability("dsaSheet"), catalog.list);
router.post("/", requireAdmin, catalog.create);
router.put("/:sheetId", requireAdmin, catalog.update);
router.delete("/:sheetId", requireAdmin, catalog.remove);

// Topic-based DSA practice sheet.
router.get("/topics", requireContentAvailability("dsaSheet"), practice.listTopics);
router.get("/topics/:slug/problems", requireContentAvailability("dsaSheet"), practice.getTopicProblems);
router.get("/admin/topics", requireAdmin, practice.listTopicsAdmin);
router.post("/admin/topics", requireAdmin, practice.createTopic);
router.put("/admin/topics/:topicId", requireAdmin, practice.updateTopic);
router.delete("/admin/topics/:topicId", requireAdmin, practice.deleteTopic);
router.get("/admin/problems", requireAdmin, practice.listProblemsAdmin);
router.post("/admin/problems", requireAdmin, practice.createProblem);
router.put("/admin/problems/:problemId", requireAdmin, practice.updateProblem);
router.delete("/admin/problems/:problemId", requireAdmin, practice.deleteProblem);
router.patch("/problems/:problemId/complete", requireContentAvailability("dsaSheet"), practice.markComplete);
router.patch("/problems/:problemId/incomplete", requireContentAvailability("dsaSheet"), practice.markIncomplete);

module.exports = router;
