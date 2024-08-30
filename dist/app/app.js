"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const apiConfig_1 = require("../config/apiConfig");
const logger_1 = require("../middlewares/logger");
const pdfReaderRouter_routes_1 = __importDefault(require("../routes/pdfReaderRouter.routes"));
const app = (0, express_1.default)();
app.disable('x-powered-by');
app.use(express_1.default.json());
app.use((0, cors_1.default)(apiConfig_1.apiConfig.CORS_SETTINGS));
app.use(logger_1.logger);
app.use('/', express_1.default.static(node_path_1.default.resolve('./public')));
app.use(pdfReaderRouter_routes_1.default);
app.use('*', (req, res) => {
    return res.status(404).sendFile(node_path_1.default.resolve('./public/404.html'));
});
exports.default = app;
