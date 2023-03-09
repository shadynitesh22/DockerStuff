import * as mongodb from 'mongodb'
import Client from './clients.model'
import test from '../test.json'



const multer = require('multer')

const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,'uploads');
    },
    filename: function(req,file,cb){
        cb(null, file.fieldname+"-"+Date.now());
    },
});
const upload = multer(storage).single("demo_image")
 
export class CLientController{
    getClients=async (req,res)=>{
      try{  
        console.log(test);
        
        console.log(req.query, "query");
        console.log(req.query.page, "page number");
        if(req.query.skip && req.query.limit){
            console.log("inside req query");
        const clients = await Client.find().skip(req.query.skip).limit(req.query.limit);
        res.status(200).send(clients)
        }
        else{
            console.log("inside else condiition");

            const clients = await Client.find()
       
        res.status(200).send(clients)
        }
        }
    catch(error){
        res.status(200).send(error.message)
    }
    }

    getClient= async (req,res)=>{
        try{
            
            const id =req?.params.id;
            const query = { _id : new mongodb.ObjectId(id)}
            const client =  await Client.findOne(query);
            if(client){
                res.status(200).send(client)
            }
            else{
                res.status(404).send(`Could not find client with id: ${id}`)
            }

        }

        catch(error){
            res.status(404).send(`Client with ID: ${req.params.id} not found`)
        }
    }

    postClient = async(req,res)=>{
        console.log('i will try to go in');
        

            console.log('i am in');
            
            console.log(req.body.client);
            
            console.log('trying to work it out');
            
            const client = new Client(JSON.parse(req.body.client));
        console.log(JSON.parse(req.body.client).firstname);

            console.log(client);
            
            const push = await client.save().then((response)=>{
                console.log('added client');
                
                return  res.status(200).send('Client Added')
            
            }).catch((error)=>{
                console.log(error)
                return res.status(500).send(error)
            })
      
       
    }

    editclient=async (req,res)=>{
        try{
            const id = req?.params?.id;
            const client = req.body;
            const query = { _id: new mongodb.ObjectId(id)};
            const result = await Client.updateOne(query, {$set:client})
            
            if(result && result.matchedCount){
                res.status(200).send(`Updated Client ID: ${id}`);
            }
            else if(!result.matchedCount){
                res.status(404).send(`Failed to find Client with ID ${id}`);
            }
            else{
                res.status(304).send(`Failed to find Client with ID ${id}`)
            }
        }
        catch(error){
            res.status(400).send(error.message);
        }
    }
    deleteClient= async(req,res)=>{
        try{
            const id = req?.params?.id;
            const query = {_id: new mongodb.ObjectId(id)};
            const result = await Client.deleteOne(query)

        if (result && result.deletedCount) {
            res.status(202).send(`Removed an client: ID ${id}`);
        } else if (!result) {
            res.status(400).send(`Failed to remove an client: ID ${id}`);
        } else if (!result.deletedCount) {
            res.status(404).send(`Failed to find an client: ID ${id}`);
        }
        }
        catch(error){
            res.status(400).send(error.message)
        }
    }



    forinvoice = async (req, res) => {
        const query = [
            {
                "$lookup": {
                    from: "projects",
                    let: {
                        id: {
                            '$toString': '$_id'
                        }
                    },
                    "pipeline": [{
                        "$match": {
                            "$expr": {
                                "$eq": [
                                    "$client",
                                    "$$id"
                                ]
                            }
                        }
                    }, {
                        "$project": {
                            "projectname": 1,
                            "projecttype": 1
                        }
                    }],
                    "as": "clientwithprojects"

                }
            }, {
                '$project': {
                    'projects': '$clientwithprojects',
                    'firstname':1,
                    'lastname':1

                }

            }
        ]


        Client.aggregate(query).then((response)=>{
            console.log(response);
            
        })
    }

    clientwithprojects=async (req,res) => {
        const cid = req?.params?.id
        console.log(cid);
        
        const query = [
            {
                "$lookup": {
                    from: "projects",
                    let: {
                       "id": "cid"
                        // {
                        //     '$toString': 'cid'
                        // }
                    },
                    "pipeline": [{
                        "$match": {
                            "$expr": {
                                "$eq": [
                                    "$client",
                                    "$$id"
                                ]
                            }
                        }
                    }, {
                        "$project": {
                            "projectname": 1,
                            "projecttype": 1,
                            "_id":1
                        }
                    }],
                    "as": "clientwithprojects"
        
                }
            }, {
                '$project': {
                    'projects': '$clientwithprojects',
                    'firstname':1,
                    'lastname':1
        
                }
        
            }
        ]
        Client.aggregate(query).then((response)=>{
            console.log(response);
            res.status(200).send(response)
        })
    }



    imgdemo=async(req,res)=>{

        console.log(req.body);
console.log("*****************************************************************");

        console.log(JSON.parse(req.body.client));
        console.log(req.body.client);
        
        console.log('image demo working');
        
        res.send("Ok thanks")
        // console.log(req.file);


        
    }
}