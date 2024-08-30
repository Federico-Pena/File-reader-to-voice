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
const pdfProcessor_1 = require("../services/pdfProcessor");
const fileUploadController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req.file === undefined || req.file.buffer === undefined) {
            throw new ApiError_1.ApiError('No se pudo leer el archivo.', 400);
        }
        let textToSend;
        const dataBuffer = req.file.buffer;
        switch (req.file.mimetype) {
            case 'application/pdf':
                textToSend = yield (0, pdfProcessor_1.pdfProcessor)(dataBuffer);
                break;
            default:
                throw new ApiError_1.ApiError('Tipo de archivo no soportado.', 415);
        }
        if (textToSend === undefined || textToSend.length === 0) {
            throw new ApiError_1.ApiError('No se pudo extraer el texto del archivo.', 400);
        }
        return res.status(200).json({
            data: textToSend
        });
    }
    catch (error) {
        console.log(error);
        if (error instanceof ApiError_1.ApiError) {
            return res.status(error.statusCode).json({ error });
        }
        return res.status(500).json({ error: { message: 'Error inesperado.' } });
    }
});
exports.default = fileUploadController;
