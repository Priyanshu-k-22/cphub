const express = require("express");

const authenticate = require("../../middlewares/auth.middleware");
const requireAdmin = require("../../middlewares/admin.middleware");
const validate = require("../../middlewares/validate.middleware");
const requireContentAvailability = require("../../middlewares/contentAvailability.middleware");

const {
    createProblemSchema,
    problemHistoryQuerySchema
} = require("./problem.validation");
const {
    create,
    getAll,
    update,
    remove,
    getDaily,
    getById,
    getHistory,
    markDailyComplete,
    markDailyIncomplete,
    getDailyProgress
} = require("./problem.controller");

const router = express.Router();


/* Create and list daily problems for admins. */
router.post(
    "/",
    authenticate,
    requireAdmin,
    validate(createProblemSchema),
    create
);

router.get(
    "/admin",
    authenticate,
    requireAdmin,
    getAll
);

router.put(
    "/:id",
    authenticate,
    requireAdmin,
    validate(createProblemSchema),
    update
);

router.delete(
    "/:id",
    authenticate,
    requireAdmin,
    remove
);


/*
    Get today's problems

    Public endpoint.
    Students should be able to see daily problems
    without needing to create an additional request
    just for authentication.
*/
router.get(
    "/daily",
    requireContentAvailability("dailyProblems"),
    getDaily
);

router.patch(
    "/:id/complete",
    authenticate,
    requireContentAvailability("dailyProblems"),
    markDailyComplete
);

router.patch(
    "/:id/incomplete",
    authenticate,
    requireContentAvailability("dailyProblems"),
    markDailyIncomplete
);

router.get(
    "/:id/progress",
    authenticate,
    requireContentAvailability("dailyProblems"),
    getDailyProgress
);


/*
    Get problem history

    Public endpoint.
*/
router.get(
    "/history",
    requireContentAvailability("dailyProblems"),
    getHistory
);


/*
    Get a single problem

    Public endpoint.
*/
router.get(
    "/:id",
    requireContentAvailability("dailyProblems"),
    getById
);


module.exports = router;
