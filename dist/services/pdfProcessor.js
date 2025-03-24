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
exports.pdfProcessor = void 0;
const pdf_parse_1 = __importDefault(require("pdf-parse"));
const ApiError_1 = require("../ApiError/ApiError");
const tesseract_js_1 = __importDefault(require("tesseract.js"));
const pdf_to_png_converter_1 = require("pdf-to-png-converter");
const pdfProcessor = (pdfBuffer) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield (0, pdf_parse_1.default)(pdfBuffer, {});
        const pdfParseText = data.text.trim().length !== 0;
        if (pdfParseText) {
            return data.text.trim().split('\n\n');
        }
        const images = yield (0, pdf_to_png_converter_1.pdfToPng)(pdfBuffer);
        const textOCR = yield extractTextWithOCR(images);
        const pdfOCRTextFail = textOCR === null || textOCR.length === 0;
        if (pdfOCRTextFail) {
            throw new ApiError_1.ApiError('Error procesando el PDF.', 500);
        }
        return textOCR;
    }
    catch (error) {
        if (error instanceof ApiError_1.ApiError) {
            throw error;
        }
        else {
            throw new ApiError_1.ApiError('Error procesando el PDF.', 500);
        }
    }
});
exports.pdfProcessor = pdfProcessor;
const extractTextWithOCR = (images) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ocrText = [];
        for (let page = 0; page < images.length; page++) {
            const { data: { text } } = yield tesseract_js_1.default.recognize(images[page].content, 'spa', {
                cacheMethod: 'tesseract://cache',
                cachePath: 'tesseract://cache'
            });
            if (text.trim().length > 0) {
                ocrText.push(text);
            }
        }
        return ocrText;
    }
    catch (error) {
        return null;
    }
});
