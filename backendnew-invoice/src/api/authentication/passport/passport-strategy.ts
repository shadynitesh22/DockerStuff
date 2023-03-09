import { error } from 'console';
import passport from 'passport';
import User from '../../User/user.model'

const localstrategy = require('passport-local');


const auth =async (User,email,password,done)=>{

    

    try{
        const user = await User.findOne({'email':email})
        
        
     
        
        if(user){
            console.log(('inside user'));
            
        user.authentication(password, user,(authError, authenticated)=>{
           
            
            if(authError) return done(authError)
          
            if(authenticated){
     
    
               
            return done(null,user)

            }
     
        })}
        else{
            throw error 
        }  
    }
    catch(error){
        done(error)
    }
}

export const passportSetup = () => {
  
    
    passport.use(new localstrategy({
        usernameField: 'email',
    }, (email, password, done)=>{

       return auth(User,email, password,done);
    }))
}



