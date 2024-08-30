"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const apiConfig_1 = require("../config/apiConfig");
const fileUploadController_1 = __importDefault(require("../controllers/fileUploadController"));
const multer_1 = require("../middlewares/multer");
const pdfReaderRouter = (0, express_1.Router)();
const { uploadFile } = apiConfig_1.apiConfig.API_ROUTES.uploadFile;
pdfReaderRouter.post(uploadFile, multer_1.multerMemoryStorage, fileUploadController_1.default);
exports.default = pdfReaderRouter;
