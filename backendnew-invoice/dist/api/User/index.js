"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_controller_1 = require("./user.controller");
const express = require('express');
const route = express.Router();
const userctrl = new user_controller_1.UserController();
route.post('/adduser', userctrl.adduser);
route.post('/usersettings', userctrl.userSetting);
route.get('/getsettings', userctrl.getsettings);
module.exports = route;
//# sourceMappingURL=index.js.map