import * as dotenv from 'dotenv'

export default (env)=>{
    dotenv.config()
    smtpoptions:{
        host: process.env.HOST
        port: process.env.PORT,
    
}
}