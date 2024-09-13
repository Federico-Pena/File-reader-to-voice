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
exports.txtProcessor = void 0;
const ApiError_1 = require("../ApiError/ApiError");
const txtProcessor = (txtBuffer) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const text = txtBuffer.toString('utf-8').trim();
        if (text.length === 0) {
            throw new ApiError_1.ApiError('El archivo TXT está vacío o no se pudo extraer el texto.', 400);
        }
        return text.split('\n\n');
    }
    catch (error) {
        if (error instanceof ApiError_1.ApiError) {
            throw error;
        }
        else {
            throw new ApiError_1.ApiError('Error procesando el archivo TXT.', 500);
        }
    }
});
exports.txtProcessor = txtProcessor;
