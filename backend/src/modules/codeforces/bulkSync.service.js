const User = require("../user/user.model");
const ApiError = require("../../utils/ApiError");
const { syncCodeforcesProfile } = require("./codeforces.service");

const delay = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));

let currentJob = {
    status: "idle",
    total: 0,
    processed: 0,
    succeeded: 0,
    failed: 0,
    currentUsername: null,
    startedAt: null,
    completedAt: null,
    failures: [],
};

const snapshot = () => ({ ...currentJob, failures: [...currentJob.failures] });

const processUsers = async (job, users) => {
    for (let index = 0; index < users.length; index += 1) {
        const user = users[index];
        job.currentUsername = user.username;

        try {
            await syncCodeforcesProfile({ userId: user._id, handle: user.username });
            job.succeeded += 1;
        } catch (error) {
            job.failed += 1;
            job.failures.push({
                username: user.username,
                message: error?.response?.data?.comment || error.message || "Codeforces sync failed",
            });
            job.failures = job.failures.slice(-25);
        }

        job.processed += 1;
        if (index < users.length - 1) {
            // Keep requests for different users separated as well as calls within a profile sync.
            await delay(2100);
        }
    }

    job.currentUsername = null;
    job.status = job.failed > 0 ? "completed_with_errors" : "completed";
    job.completedAt = new Date();
};

const startBulkSync = async () => {
    if (currentJob.status === "running" || currentJob.status === "starting") {
        throw new ApiError(409, "A Codeforces sync is already running");
    }

    currentJob = {
        status: "starting",
        total: 0,
        processed: 0,
        succeeded: 0,
        failed: 0,
        currentUsername: null,
        startedAt: new Date(),
        completedAt: null,
        failures: [],
    };

    let users;
    try {
        users = await User.find().select("username").sort({ username: 1 }).lean();
    } catch (error) {
        currentJob.status = "failed";
        currentJob.completedAt = new Date();
        throw error;
    }

    currentJob.status = "running";
    currentJob.total = users.length;

    const job = currentJob;
    setImmediate(() => {
        processUsers(job, users).catch((error) => {
            job.status = "failed";
            job.currentUsername = null;
            job.completedAt = new Date();
            job.failures.push({ username: "—", message: error.message || "Bulk sync failed" });
        });
    });

    return snapshot();
};

module.exports = {
    startBulkSync,
    getBulkSyncStatus: snapshot,
};
