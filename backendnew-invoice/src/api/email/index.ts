import { emailController } from "./email.controller";

const express = require('express');
const route = express.Router();
const emailctrl = new emailController;



route.post('/sendemail',emailctrl.sendmail)
console.log();



module.exports = route