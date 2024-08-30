"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiError = void 0;
class ApiError extends Error {
    // eslint-disable-next-line @typescript-eslint/space-before-function-paren
    constructor(message, statusCode = 500) {
        super();
        this.statusCode = 500;
        this.type = 'ApiError';
        this.statusCode = statusCode;
        this.message = message;
    }
}
exports.ApiError = ApiError;
