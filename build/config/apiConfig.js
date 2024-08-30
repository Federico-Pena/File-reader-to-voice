"use strict";
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiConfig = void 0;
const API_URL = process.env.NODE_ENV === 'development'
    ? `http://localhost:${(_a = process.env.PORT) !== null && _a !== void 0 ? _a : 1234}`
    : 'https://lector-de-archivos.vercel.app/';
const CORS_SETTINGS = {
    origin: ['http://localhost:5173', 'https://lector-de-archivos.vercel.app/'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
    // maxAge: 3600
    // credentials: true,
    // optionsSuccessStatus: 200,
    // preflightContinue: true,
};
const API_ROUTES = {
    someRoutes: {
        route1: '/api/v1/upload-file'
    }
};
exports.apiConfig = {
    API_URL,
    PORT: (_b = process.env.PORT) !== null && _b !== void 0 ? _b : 1234,
    API_ROUTES,
    CORS_SETTINGS
};
