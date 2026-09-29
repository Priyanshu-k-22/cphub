const express = require("express");

const authenticate = require("../../middlewares/auth.middleware");
const requireAdmin = require("../../middlewares/admin.middleware");
const validate = require("../../middlewares/validate.middleware");

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
    getDaily
);

router.patch(
    "/:id/complete",
    authenticate,
    markDailyComplete
);

router.patch(
    "/:id/incomplete",
    authenticate,
    markDailyIncomplete
);

router.get(
    "/:id/progress",
    authenticate,
    getDailyProgress
);


/*
    Get problem history

    Public endpoint.
*/
router.get(
    "/history",
    getHistory
);


/*
    Get a single problem

    Public endpoint.
*/
router.get(
    "/:id",
    getById
);


module.exports = router;
