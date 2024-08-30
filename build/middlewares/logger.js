"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.colors = exports.logger = void 0;
const logger = (req, res, next) => {
    const date = new Date();
    const methodColor = setColorMethod(req.method);
    const message = `${date.toLocaleDateString()} ${date.toLocaleTimeString()} --> ${methodColor}${req.method}${exports.colors.reset} statusCode ${req.url}`;
    res.on('finish', () => {
        const statusCodeColor = setColorStatusCode(res.statusCode);
        const finalMessage = message.replace('statusCode', `${statusCodeColor}${res.statusCode}${exports.colors.reset}`);
        console.log(finalMessage);
    });
    next();
};
exports.logger = logger;
const setColorStatusCode = (statusCode) => {
    if (statusCode >= 500) {
        return exports.colors.red;
    }
    else if (statusCode >= 400) {
        return exports.colors.yellow;
    }
    else if (statusCode >= 300) {
        return exports.colors.cyan;
    }
    else if (statusCode >= 200) {
        return exports.colors.green;
    }
    else {
        return exports.colors.white;
    }
};
const setColorMethod = (method) => {
    if (method === 'GET') {
        return exports.colors.blue;
    }
    else if (method === 'POST') {
        return exports.colors.magenta;
    }
    else if (method === 'PUT') {
        return exports.colors.cyan;
    }
    else if (method === 'DELETE') {
        return exports.colors.red;
    }
    else {
        return exports.colors.white;
    }
};
exports.colors = {
    reset: '\x1b[0m',
    red: '\x1b[31m',
    yellow: '\x1b[33m',
    green: '\x1b[32m',
    blue: '\x1b[34m',
    magenta: '\x1b[35m',
    cyan: '\x1b[36m',
    white: '\x1b[37m'
};
