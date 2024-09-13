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
exports.htmlProcessor = void 0;
const html_to_text_1 = require("html-to-text");
const ApiError_1 = require("../ApiError/ApiError");
const htmlProcessor = (htmlBuffer) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const htmlText = htmlBuffer.toString('utf-8');
        const text = (0, html_to_text_1.convert)(htmlText, { wordwrap: 130 });
        if (text.trim().length === 0) {
            throw new ApiError_1.ApiError('El archivo HTML está vacío o no se pudo extraer el texto.', 400);
        }
        return text.trim().split('\n\n');
    }
    catch (error) {
        if (error instanceof ApiError_1.ApiError) {
            throw error;
        }
        else {
            throw new ApiError_1.ApiError('Error procesando el archivo HTML.', 500);
        }
    }
});
exports.htmlProcessor = htmlProcessor;
