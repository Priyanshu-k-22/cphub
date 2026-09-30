const User = require("./user.model");
const mongoose = require("mongoose");
const crypto = require("crypto");
const CPProblem = require("../cpSheet/cpProblem.model");
const CPProgress = require("../cpSheet/cpProgress.model");
const Codeforces = require("../codeforces/codeforces.model");
const ApiError = require("../../utils/ApiError");

const escapeRegex = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const listUsersForAdmin = async ({ page = 1, limit = 20, search = "" } = {}) => {
    const safePage = Math.max(1, Number(page) || 1);
    const safeLimit = Math.min(50, Math.max(1, Number(limit) || 20));
    const query = {};

    if (search.trim()) {
        const pattern = new RegExp(escapeRegex(search.trim()), "i");
        query.$or = [
            { username: pattern },
            { email: pattern },
        ];
    }

    const [users, total] = await Promise.all([
        User.find(query)
            .select("username email role profile createdAt")
            .sort({ createdAt: -1, _id: -1 })
            .skip((safePage - 1) * safeLimit)
            .limit(safeLimit)
            .lean(),
        User.countDocuments(query),
    ]);

    return {
        users: users.map((user) => ({ ...user, role: user.role || "student" })),
        pagination: {
            page: safePage,
            limit: safeLimit,
            total,
            totalPages: Math.ceil(total / safeLimit),
        },
    };
};

const getAdminUserProgress = async ({ page = 1, limit = 20 } = {}) => {
    const safePage = Math.max(1, Number(page) || 1);
    const safeLimit = Math.min(50, Math.max(1, Number(limit) || 20));
    const [users, total, activeProblems] = await Promise.all([
        User.find().select("username role").sort({ username: 1, _id: 1 }).skip((safePage - 1) * safeLimit).limit(safeLimit).lean(),
        User.countDocuments(),
        CPProblem.find({ isActive: true }).select("_id").lean(),
    ]);
    const activeProblemIds = activeProblems.map((problem) => problem._id);
    const totalActiveProblems = activeProblemIds.length;
    const userIds = users.map((user) => user._id);
    const [codeforcesRows, progressRows] = await Promise.all([
        userIds.length ? Codeforces.find({ user: { $in: userIds } }).select("user rating maxRating rank solvedProblems contestCount").lean() : [],
        totalActiveProblems && userIds.length ? CPProgress.aggregate([
            { $match: { solved: true, user: { $in: userIds }, problem: { $in: activeProblemIds } } },
            { $group: { _id: "$user", solved: { $sum: 1 } } },
        ]) : [],
    ]);
    const progressByUser = new Map(progressRows.map((row) => [String(row._id), row.solved]));
    const codeforcesByUser = new Map(codeforcesRows.map((row) => [String(row.user), row]));

    return {
      users: users.map((user) => {
        const cpSolved = progressByUser.get(String(user._id)) || 0;
        const codeforces = codeforcesByUser.get(String(user._id));
        return {
            id: user._id,
            username: user.username,
            role: user.role || "student",
            cpSolved,
            cpTotal: totalActiveProblems,
            cpPercent: totalActiveProblems ? Math.min(100, Math.round(cpSolved / totalActiveProblems * 100)) : 0,
            codeforcesRating: codeforces?.rating ?? null,
            codeforcesRank: codeforces?.rank || "Unrated",
            codeforcesSolved: codeforces?.solvedProblems ?? null,
            contestCount: codeforces?.contestCount ?? null,
        };
      }),
      pagination: { page: safePage, limit: safeLimit, total, totalPages: Math.ceil(total / safeLimit) },
    };
};

const getUserAdminProfile = async (userId) => {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
        throw new ApiError(400, "Invalid user ID");
    }

    const user = await User.findById(userId)
        .select("username email role profile createdAt updatedAt")
        .lean();

    if (!user) {
        throw new ApiError(404, "User not found");
    }

    const [activeProblems, codeforces] = await Promise.all([
        CPProblem.find({ isActive: true }).select("_id").lean(),
        Codeforces.findOne({ user: userId })
            .select("rating maxRating rank maxRank solvedProblems contestCount lastContest lastSyncedAt")
            .lean(),
    ]);
    const activeProblemIds = activeProblems.map((problem) => problem._id);
    const totalActiveCPProblems = activeProblemIds.length;
    const progressQuery = {
        user: userId,
        solved: true,
        problem: { $in: activeProblemIds },
    };

    const [solvedCount, recentSolved] = await Promise.all([
        totalActiveCPProblems ? CPProgress.countDocuments(progressQuery) : 0,
        totalActiveCPProblems ? CPProgress.find(progressQuery)
            .sort({ solvedAt: -1 })
            .limit(10)
            .populate("problem", "title rating url")
            .lean() : [],
    ]);

    return {
        user: { ...user, role: user.role || "student" },
        cpProgress: {
            solved: solvedCount,
            total: totalActiveCPProblems,
            percentage: totalActiveCPProblems
                ? Math.round((solvedCount / totalActiveCPProblems) * 100)
                : 0,
        },
        recentSolved: recentSolved
            .filter((item) => item.problem)
            .map((item) => ({
                id: item._id,
                solvedAt: item.solvedAt,
                problem: item.problem,
            })),
        codeforces,
    };
};

const getCurrentUser = async (userId) => {
    const user = await User.findById(userId)
        .select("-password");

    return user;
};

const updateProfile = async (
    userId,
    { college, bio, department, currentSemester, skills, links }
) => {
    const updateData = {};

    if (college !== undefined) {
        updateData["profile.college"] = college;
    }

    if (bio !== undefined) {
        updateData["profile.bio"] = bio;
    }

    if (department !== undefined) {
        updateData["profile.department"] = department;
    }

    if (currentSemester !== undefined) {
        updateData["profile.currentSemester"] = currentSemester;
    }

    if (skills !== undefined) {
        updateData["profile.skills"] = [...new Set(skills.map((skill) => skill.trim()).filter(Boolean))];
    }

    if (links) {
        for (const [key, value] of Object.entries(links)) {
            if (value !== undefined) updateData[`profile.links.${key}`] = value;
        }
    }

    const user = await User.findByIdAndUpdate(
        userId,
        {
            $set: updateData
        },
        {
            new: true,
            runValidators: true
        }
    ).select("-password");

    return user;
};

const uploadAvatar = async (userId, imageBuffer, contentType) => {
    const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } = process.env;
    if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_API_KEY || !CLOUDINARY_API_SECRET) {
        throw new ApiError(503, "Profile photo uploads are not configured on the server");
    }

    const timestamp = Math.floor(Date.now() / 1000);
    const folder = "cphub/profiles";
    const publicId = `user_${userId}`;
    const signedParams = {
        folder,
        overwrite: "true",
        public_id: publicId,
        timestamp: String(timestamp),
    };
    const signatureBase = Object.keys(signedParams)
        .sort()
        .map((key) => `${key}=${signedParams[key]}`)
        .join("&");
    const signature = crypto
        .createHash("sha1")
        .update(`${signatureBase}${CLOUDINARY_API_SECRET}`)
        .digest("hex");

    const form = new FormData();
    form.append("file", new Blob([imageBuffer], { type: contentType }), "profile-photo");
    form.append("api_key", CLOUDINARY_API_KEY);
    form.append("timestamp", String(timestamp));
    form.append("folder", folder);
    form.append("public_id", publicId);
    form.append("overwrite", "true");
    form.append("signature", signature);

    let uploadedImage;
    try {
        const response = await fetch(
            `https://api.cloudinary.com/v1_1/${encodeURIComponent(CLOUDINARY_CLOUD_NAME)}/image/upload`,
            { method: "POST", body: form, signal: AbortSignal.timeout(30000) }
        );
        uploadedImage = await response.json();
        if (!response.ok || !uploadedImage?.secure_url) {
            throw new Error(uploadedImage?.error?.message || "Cloudinary rejected the photo upload");
        }
    } catch (error) {
        throw new ApiError(502, error.message || "Could not upload the profile photo");
    }

    const user = await User.findByIdAndUpdate(
        userId,
        { $set: { "profile.avatar": uploadedImage.secure_url } },
        { new: true, runValidators: true }
    ).select("-password");

    if (!user) throw new ApiError(404, "User not found");
    return user;
};

module.exports = {
    getCurrentUser,
    updateProfile,
    uploadAvatar,
    listUsersForAdmin,
    getAdminUserProgress,
    getUserAdminProfile,
};
