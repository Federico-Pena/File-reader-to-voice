"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app/app"));
const apiConfig_1 = require("./config/apiConfig");
app_1.default.listen(apiConfig_1.apiConfig.PORT, () => {
    const text = `Server running in: ${apiConfig_1.apiConfig.API_URL}`;
    console.log(text);
});
