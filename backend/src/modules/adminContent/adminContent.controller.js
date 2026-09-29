const { z } = require("zod");
const asyncHandler = require("../../middlewares/asyncHandler");
const ApiError = require("../../utils/ApiError");
const ApiResponse = require("../../utils/ApiResponse");
const AdminContent = require("./adminContent.model");

const kinds = new Set(["ctc", "interview", "systemDesign", "miscellaneous"]);
const contentSchema = z.object({
    title: z.string().trim().min(1, "Title is required").max(160),
    description: z.string().trim().max(4000).optional().default(""),
    category: z.string().trim().max(80).optional().default(""),
    url: z.union([z.literal(""), z.string().trim().max(500).url()]).optional().default(""),
    author: z.string().trim().max(100).optional().default(""),
    difficulty: z.string().trim().max(40).optional().default(""),
    status: z.enum(["draft", "published"]).optional().default("published"),
});

const validateKind = (kind) => {
    if (!kinds.has(kind)) throw new ApiError(404, "Content collection not found");
};

const list = asyncHandler(async (req, res) => {
    validateKind(req.params.kind);
    const items = await AdminContent.find({ kind: req.params.kind }).sort({ updatedAt: -1, _id: -1 }).lean();
    return res.status(200).json(new ApiResponse(200, items, "Content loaded"));
});

const create = asyncHandler(async (req, res) => {
    validateKind(req.params.kind);
    const parsed = contentSchema.safeParse(req.body);
    if (!parsed.success) throw new ApiError(400, "Invalid content", parsed.error.flatten());
    const item = await AdminContent.create({ ...parsed.data, kind: req.params.kind });
    return res.status(201).json(new ApiResponse(201, item, "Content created"));
});

const update = asyncHandler(async (req, res) => {
    validateKind(req.params.kind);
    if (!z.string().regex(/^[a-f\d]{24}$/i).safeParse(req.params.id).success) throw new ApiError(400, "Invalid content ID");
    const parsed = contentSchema.safeParse(req.body);
    if (!parsed.success) throw new ApiError(400, "Invalid content", parsed.error.flatten());
    const item = await AdminContent.findOneAndUpdate(
        { _id: req.params.id, kind: req.params.kind },
        { $set: parsed.data },
        { new: true, runValidators: true }
    ).lean();
    if (!item) throw new ApiError(404, "Content not found");
    return res.status(200).json(new ApiResponse(200, item, "Content updated"));
});

const remove = asyncHandler(async (req, res) => {
    validateKind(req.params.kind);
    if (!z.string().regex(/^[a-f\d]{24}$/i).safeParse(req.params.id).success) throw new ApiError(400, "Invalid content ID");
    const item = await AdminContent.findOneAndDelete({ _id: req.params.id, kind: req.params.kind });
    if (!item) throw new ApiError(404, "Content not found");
    return res.status(200).json(new ApiResponse(200, { id: req.params.id }, "Content deleted"));
});

module.exports = { list, create, update, remove };
