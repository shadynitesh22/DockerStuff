"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const email_controller_1 = require("./email.controller");
const express = require('express');
const route = express.Router();
const emailctrl = new email_controller_1.emailController;
route.post('/sendemail', emailctrl.sendmail);
console.log();
module.exports = route;
//# sourceMappingURL=index.js.map