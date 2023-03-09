const mongoose =  require('mongoose')


const settings = new mongoose.Schema({
    
        client:String,
        project:String
 
},{capped:{max:1, size: 1}});


export default mongoose.model('Setting', settings);
