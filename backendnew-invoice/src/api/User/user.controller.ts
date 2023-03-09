import User from './user.model'
import passport from 'passport';
import { Authentication } from '../authentication/authentication';
import Setting from './settings.model';
import { response } from 'express';
const jwt = require('jsonwebtoken')

export class UserController {

    tokenizer = new Authentication()

    adduser = async (req, res) => {
        const user = new User(req.body)
        await user.save().then((response) => {
            return res.status(200).send('Posted Successfully')

        }).catch((error) => {
            return res.status(500).send(error.message)
        })
    }

    loginUser = (req, res, next) => {

        const user = passport.authenticate('local', async (err, user) => {
            if (!user) {
                console.log('i should be here');

                return res.status(404).send('Invalid Credentials')
            }


            const userInfo = {
                email: user.email,
                id: user._id
            }

            const token = await jwt.sign(userInfo, process.env.SECRET_KEY)

            res.status(200).json({ token: token })

        })(req, res, next);





    }

    userSetting =async (req,res)=>{
        
        const set = [req.body]
      
        
        const setting = new Setting(req.body);
       
        
        await setting.save().then((response)=>{
         return  res.status(200).send(response)
        }).catch((err)=>{
            return res.status(500).send(err)
        })
    }


    getsettings=async (req,res) => {
        console.log("inside get settings");
        
     const setting = await Setting.find()
     res.status(200).send(setting)
    }
}