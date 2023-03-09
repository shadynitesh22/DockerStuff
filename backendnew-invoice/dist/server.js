"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//importing necessary packages for server and databases and authentications
const dotenv = __importStar(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./routes"));
const mongoose_1 = __importDefault(require("mongoose"));
const passport_1 = __importDefault(require("passport"));
const user_model_1 = __importDefault(require("./api/User/user.model"));
const user = new user_model_1.default();
dotenv.config();
const bodyparser = require('body-parser');
const session = require('express-session');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('swagger-jsdoc');
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(bodyparser.json());
app.use(session({
    secret: 'invoice',
    resave: false,
    saveUninitialized: true,
}));
require('./api/authentication/passport/passport-strategy').passportSetup(user);
// import './api/authentication/passport/passport-strategy';
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
app.use('./api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
mongoose_1.default.connect("mongodb+srv://aayush:helloworld123@cluster0.oate9.mongodb.net/invoice");
(0, routes_1.default)(app);
app.listen(5200, () => {
    console.log('successfully running at 5200');
});
//# sourceMappingURL=server.js.map