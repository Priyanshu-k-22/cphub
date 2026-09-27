const { z } = require("zod");

const socialProfileUrl = (host) => z.string()
    .trim()
    .max(200, "Profile links cannot exceed 200 characters")
    .refine((value) => {
        if (!value) return true;
        try {
            const parsed = new URL(value);
            return ["http:", "https:"].includes(parsed.protocol) &&
                (parsed.hostname === host || parsed.hostname.endsWith(`.${host}`));
        } catch {
            return false;
        }
    }, `Enter a valid ${host} profile URL`);

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

    department: z.string().trim().max(100, "Department cannot exceed 100 characters").optional(),

    currentSemester: z.string().trim().max(40, "Current semester cannot exceed 40 characters").optional(),

    skills: z.array(
        z.string().trim().min(1).max(40, "Each skill cannot exceed 40 characters")
    ).max(20, "You can add up to 20 skills").optional(),

    links: z.object({
        github: socialProfileUrl("github.com").optional(),
        linkedin: socialProfileUrl("linkedin.com").optional(),
    }).optional()
});

module.exports = {
    updateProfileSchema
};
