"use strict";
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiConfig = void 0;
const API_URL = process.env.NODE_ENV === 'development'
    ? `http://localhost:${(_a = process.env.PORT) !== null && _a !== void 0 ? _a : 1234}`
    : '/';
const ACCEPTED_MIME_TYPES = {
    pdf: {
        server: 'application/pdf',
        client: 'pdf'
    },
    docx: {
        server: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        client: 'docx'
    },
    txt: {
        server: 'text/plain',
        client: 'txt'
    },
    rtf: {
        server: 'application/rtf',
        client: 'rtf'
    },
    html: {
        server: 'text/html',
        client: 'html'
    },
    md: {
        server: '.md',
        client: 'md'
    }
};
const CORS_SETTINGS = {
    origin: [
        'http://localhost:1234',
        'http://localhost:5173',
        'https://lectura-de-archivos.vercel.app'
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
    // maxAge: 3600
    // credentials: true,
    // optionsSuccessStatus: 200,
    // preflightContinue: true,
};
const API_ROUTES = {
    uploadFile: {
        uploadFile: '/api/v1/upload-file',
        getMimeTypes: '/api/v1/get-mime-types'
    }
};
exports.apiConfig = {
    ACCEPTED_MIME_TYPES,
    API_URL,
    PORT: (_b = process.env.PORT) !== null && _b !== void 0 ? _b : 1234,
    API_ROUTES,
    CORS_SETTINGS
};
