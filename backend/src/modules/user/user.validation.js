const { z } = require("zod");

const updateProfileSchema = z.object({
    college: z
        .string()
        .trim()
        .max(100, "College name cannot exceed 100 characters")
        .optional(),

    bio: z
        .string()
        .trim()
        .max(300, "Bio cannot exceed 300 characters")
        .optional(),

    avatar: z.union([
        z.string()
            .trim()
            .max(500, "Avatar URL cannot exceed 500 characters")
            .url("Avatar must be a valid URL"),
        z.literal(""),
    ]).optional()
});

module.exports = {
    updateProfileSchema
};
