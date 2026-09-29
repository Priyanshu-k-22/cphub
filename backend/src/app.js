const express = require("express");
const errorHandler = require("./middlewares/error.middleware");
const cookieParser = require("cookie-parser");

const authRoutes = require("./modules/auth/auth.routes");
const userRoutes = require("./modules/user/user.routes");
const problemRoutes = require("./modules/problem/problem.routes");
const contestRoutes = require("./modules/contest/contest.routes");
const cpSheetRoutes = require("./modules/cpSheet/cpSheet.routes.js");
const dsaSheetRoutes = require("./modules/dsaSheet/dsaSheet.routes");
const codeforcesRoutes = require("./modules/codeforces/codeforces.routes");
const dashboardRoutes = require("./modules/dashboard/dashboard.routes");
const adminContentRoutes = require("./modules/adminContent/adminContent.routes");
const platformSettingsRoutes = require("./modules/settings/platformSettings.routes");


const cors = require("cors");

const app = express();
const allowedOrigins = [
    "http://localhost:5173",
    "https://cphub-phi.vercel.app",
];

app.use(
    cors({
        origin: (origin, callback) => {
            if (
                !origin ||
                allowedOrigins.includes(origin)
            ) {
                callback(null, true);
            } else {
                callback(
                    new Error(
                        "Not allowed by CORS"
                    )
                );
            }
        },
        credentials: true,
    })
);

app.use(
    "/api/users/me/avatar",
    express.raw({
        type: ["image/jpeg", "image/png", "image/webp", "image/gif", "image/avif"],
        limit: "5mb",
    })
);
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/problems", problemRoutes);
app.use("/api/contests",contestRoutes);
app.use("/api/cp-sheet",cpSheetRoutes);
app.use("/api/dsa-sheet", dsaSheetRoutes);
app.use("/api/codeforces",codeforcesRoutes);
app.use("/api/dashboard",dashboardRoutes);
app.use("/api/admin/content", adminContentRoutes);
app.use("/api/settings", platformSettingsRoutes);

app.use(errorHandler)

module.exports = app;
