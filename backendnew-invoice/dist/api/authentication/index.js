"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_controller_1 = require("../User/user.controller");
const user_model_1 = __importDefault(require("../User/user.model"));
const express = require('express');
const route = express.Router();
const user = new user_model_1.default();
const userctrl = new user_controller_1.UserController();
require('./passport/passport-strategy').passportSetup(user);
// route.post('/userlogin', authenticate('local'))
// route.post('/userlogin', passport.authenticate('local',(error,user)=>{console.log("userlogin");
// console.log(user);
// // const token = AuthenticationService.generateJwtToken(user);
// }))
route.post('/userlogin', userctrl.loginUser);
module.exports = route;
//# sourceMappingURL=index.js.map