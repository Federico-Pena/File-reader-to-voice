"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const apiConfig_1 = require("../config/apiConfig");
const ApiError_1 = require("../ApiError/ApiError");
const getMimeTypes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const clientMimeTypes = Object.values(apiConfig_1.apiConfig.ACCEPTED_MIME_TYPES).map((type) => type.client);
        return res.status(200).json({
            data: clientMimeTypes
        });
    }
    catch (error) {
        const apiError = new ApiError_1.ApiError('Error inesperado intentalo nuevamente.', 500);
        return res.status(apiError.statusCode).json({
            error: apiError
        });
    }
});
exports.default = getMimeTypes;
