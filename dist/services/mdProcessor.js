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
exports.mdProcessor = void 0;
const markdown_it_1 = __importDefault(require("markdown-it"));
const ApiError_1 = require("../ApiError/ApiError");
const mdProcessor = (mdBuffer) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const markdown = mdBuffer.toString('utf-8');
        const md = new markdown_it_1.default();
        const text = md.render(markdown).replace(/<\/?[^>]+(>|$)/g, ''); // Remueve etiquetas HTML
        if (text.trim().length === 0) {
            throw new ApiError_1.ApiError('El archivo MD está vacío o no se pudo extraer el texto.', 400);
        }
        return text.trim().split('\n\n');
    }
    catch (error) {
        if (error instanceof ApiError_1.ApiError) {
            throw error;
        }
        else {
            throw new ApiError_1.ApiError('Error procesando el archivo MD.', 500);
        }
    }
});
exports.mdProcessor = mdProcessor;
