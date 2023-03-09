import { UserController } from "./user.controller";
const express = require('express');
const route = express.Router();
const userctrl =  new UserController();

route.post('/adduser',userctrl.adduser);
route.post('/usersettings', userctrl.userSetting)
route.get('/getsettings', userctrl.getsettings)


module.exports =  route