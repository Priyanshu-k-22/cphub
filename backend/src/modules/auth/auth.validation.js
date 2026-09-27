const{z} = require("zod");

const registerSchema = z.object({
    username: z
        .string()
        .trim(),

    email: z
        .string()
        .trim()
        .email("Please provide a valid email!"),

    password: z
        .string()
        .min(8, "Password must be at least 8 characters")
        .max(100, "Password cannot exceed 100 characters")
});

const loginSchema = z.object({
    email: z
        .string()
        .trim()
        .email("Please provide a valid email"),

    password: z
        .string()
        .min(1, "Password is required")
});

module.exports = {
    registerSchema,
    loginSchema,
}