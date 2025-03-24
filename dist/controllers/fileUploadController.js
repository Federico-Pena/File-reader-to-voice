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
const ApiError_1 = require("../ApiError/ApiError");
const apiConfig_1 = require("../config/apiConfig");
const switchServices_1 = require("../services/switchServices");
const fileUploadController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req.file === undefined || req.file.buffer === undefined) {
            throw new ApiError_1.ApiError('No se pudo leer el archivo.', 400);
        }
        const mimeTypes = Object.values(apiConfig_1.apiConfig.ACCEPTED_MIME_TYPES).map((type) => type.server);
        if (!mimeTypes.includes(req.file.mimetype)) {
            const clientMimeTypes = Object.values(apiConfig_1.apiConfig.ACCEPTED_MIME_TYPES)
                .map((type) => `"${type.client}"`)
                .join(', ');
            const msg = `Los formatos permitidos son: ${clientMimeTypes}.`;
            throw new ApiError_1.ApiError(msg, 400);
        }
        const dataBuffer = req.file.buffer;
        const textToSend = yield (0, switchServices_1.switchServices)(req.file.mimetype, dataBuffer);
        if (textToSend === undefined || textToSend.length === 0) {
            throw new ApiError_1.ApiError('No se pudo extraer el texto del archivo.', 400);
        }
        return res.status(200).json({
            data: textToSend
        });
    }
    catch (error) {
        if (error instanceof ApiError_1.ApiError) {
            return res.status(error.statusCode).json({
                error
            });
        }
        const apiError = new ApiError_1.ApiError('Error inesperado intentalo nuevamente.', 500);
        return res.status(apiError.statusCode).json({ error: apiError });
    }
});
exports.default = fileUploadController;
