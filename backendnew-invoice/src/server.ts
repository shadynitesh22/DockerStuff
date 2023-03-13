//importing necessary packages for server and databases and authentications
import * as dotenv from 'dotenv';
import cors from 'cors';
import express from 'express';
import setRoute from './routes'
import mongoose from 'mongoose';
import passport from 'passport';
import userModel from './api/User/user.model';



const user = new userModel()

dotenv.config();
const bodyparser = require('body-parser');
const session = require('express-session');



const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('swagger-jsdoc')

const app = express()

app.use(cors(
    
));
app.use(bodyparser.json())

app.use(session({
    secret: 'invoice',
    resave: false,
    saveUninitialized: true,
}));
require('./api/authentication/passport/passport-strategy').passportSetup(user)

// import './api/authentication/passport/passport-strategy';
app.use(passport.initialize())
app.use(passport.session())
app.use('./api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
 





mongoose.connect("mongodb+srv://aayush:helloworld123@cluster0.oate9.mongodb.net/invoice")
setRoute(app)
app.listen(5200, () => {
    console.log('successfully running at 5200');
});