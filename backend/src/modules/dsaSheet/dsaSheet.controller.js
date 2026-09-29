const asyncHandler = require("../../middlewares/asyncHandler");
const ApiResponse = require("../../utils/ApiResponse");
const service = require("./dsaSheet.service");

const list = asyncHandler(async (_req, res) => res.status(200).json(new ApiResponse(200, await service.listDSASheets(), "DSA sheets fetched successfully")));
const create = asyncHandler(async (req, res) => res.status(201).json(new ApiResponse(201, await service.createDSASheet(req.body), "DSA sheet created successfully")));
const update = asyncHandler(async (req, res) => res.status(200).json(new ApiResponse(200, await service.updateDSASheet(req.params.sheetId, req.body), "DSA sheet updated successfully")));
const remove = asyncHandler(async (req, res) => {
    const sheet = await service.deleteDSASheet(req.params.sheetId);
    return res.status(200).json(new ApiResponse(200, { _id: sheet._id }, "DSA sheet deleted successfully"));
});
module.exports = { list, create, update, remove };
