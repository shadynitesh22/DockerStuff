import passport from "passport";
import { UserController } from "../User/user.controller";
import userModel from "../User/user.model";

const express = require('express')
const route = express.Router()

const user = new userModel()
const userctrl =  new UserController();
require('./passport/passport-strategy').passportSetup(user)

// route.post('/userlogin', authenticate('local'))


// route.post('/userlogin', passport.authenticate('local',(error,user)=>{console.log("userlogin");
// console.log(user);
// // const token = AuthenticationService.generateJwtToken(user);


// }))

route.post('/userlogin', userctrl.loginUser)

module.exports = route