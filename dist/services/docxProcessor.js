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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.docxProcessor = void 0;
const mammoth_1 = __importDefault(require("mammoth"));
const ApiError_1 = require("../ApiError/ApiError");
const docxProcessor = (docxBuffer) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { value: text } = yield mammoth_1.default.extractRawText({ buffer: docxBuffer });
        if (text.trim().length === 0) {
            throw new ApiError_1.ApiError('El archivo DOCX está vacío o no se pudo extraer el texto.', 400);
        }
        return text.trim().split('\n\n');
    }
    catch (error) {
        console.error('Error procesando DOCX:', error.message);
        throw new ApiError_1.ApiError('Error procesando el archivo DOCX.', 500);
    }
});
exports.docxProcessor = docxProcessor;
