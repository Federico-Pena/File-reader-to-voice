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
exports.switchServices = void 0;
const ApiError_1 = require("../ApiError/ApiError");
const apiConfig_1 = require("../config/apiConfig");
const docxProcessor_1 = require("./docxProcessor");
const htmlProcessor_1 = require("./htmlProcessor");
const mdProcessor_1 = require("./mdProcessor");
const pdfProcessor_1 = require("./pdfProcessor");
const rtfProcessor_1 = require("./rtfProcessor");
const txtProcessor_1 = require("./txtProcessor");
const switchServices = (mimetype, dataBuffer) => __awaiter(void 0, void 0, void 0, function* () {
    let textToSend;
    switch (mimetype) {
        case apiConfig_1.apiConfig.ACCEPTED_MIME_TYPES.pdf.server:
            textToSend = yield (0, pdfProcessor_1.pdfProcessor)(dataBuffer);
            break;
        case apiConfig_1.apiConfig.ACCEPTED_MIME_TYPES.docx.server:
            textToSend = yield (0, docxProcessor_1.docxProcessor)(dataBuffer);
            break;
        case apiConfig_1.apiConfig.ACCEPTED_MIME_TYPES.txt.server:
            textToSend = yield (0, txtProcessor_1.txtProcessor)(dataBuffer);
            break;
        case apiConfig_1.apiConfig.ACCEPTED_MIME_TYPES.rtf.server:
            textToSend = yield (0, rtfProcessor_1.rtfProcessor)(dataBuffer);
            break;
        case apiConfig_1.apiConfig.ACCEPTED_MIME_TYPES.html.server:
            textToSend = yield (0, htmlProcessor_1.htmlProcessor)(dataBuffer);
            break;
        case apiConfig_1.apiConfig.ACCEPTED_MIME_TYPES.md.server:
            textToSend = yield (0, mdProcessor_1.mdProcessor)(dataBuffer);
            break;
        default:
            throw new ApiError_1.ApiError('Tipo de archivo no soportado.', 415);
    }
    return textToSend;
});
exports.switchServices = switchServices;
