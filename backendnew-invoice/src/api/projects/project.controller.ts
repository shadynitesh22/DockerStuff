
import { query, response } from 'express';
import { ClientRequest } from 'http';
import * as mongodb from 'mongodb';
import Project from './project.model'
export class ProjectController{
   
    // getProjects = async(req,res)=>{
    //     try{
    //         const projects =  this.Projects.find({}).toArray()
    //         res.status(200).send(projects)
    //     }
    //     catch(error){
    //         res.status(400).send(error.message)
    //     }
    // }

    // getProjects = async(req,res)=>{
    //     Project.find({}).then((documents)=>{
    //         console.log(documents);
           
            
    //         res.status(200).send(documents)
    //     }).catch((error)=>{
    //         res.status(400).send(error)
    //     });
    //     const pipeline =[];
    //     const query={
    //         $lookup:{
                    
    //         }
    //     };
      
    //     console.log(query);
        
    //     Project.aggregate([{
    //         $lookup:{

    //         }
    //     }])
    // }

    getProject = async(req,res)=>{
        try{
            const id  = req.params?.id;
            const query = {_id: new mongodb.ObjectId(id) }
            const project = await Project.findOne(query);
            if(project){
                res.status(200).send(project)
            }
            else{
                res.status(404).send(`Client with ID: ${id} not found`)
            }
            
        }catch(error){
            res.status(404).send(`Client with ID: ${req.params.id} not found`)
        }
    }

    // getProject=async(req,res)=>{
       
    //    try{
    //     const id = req.params?.id;
    //     console.log("before query")
    //     const query = {_id : new mongodb.ObjectId(id)}
    //     console.log("before try")
    //     Project.findOne(query).then((document)=>{

    //        if(document){
    //         res.status(200).send(document)
    //        }
    //        else{
    //         res.status(404).send(`Cannot find project with ID ${id}`)
    //        }
    //     })
    // }catch{(error)=>{
    //         res.status(500).send(error)
    //     }}
    // }
    
    
    // addProject = async(req,res)=>{
    //     try{
    //         const project  = req.body
    //         const pushproject = await this.Projects.insertOne(project)
    //         if(pushproject.acknowledged){
    //             res.status(200).send(`New Project created ${pushproject.insertedId}`)
    //         }
    //         else{
    //             res.status(500).send(`failed to add project`)
    //         }
    //     }
    //     catch(error){
    //         res.status(400).send(error.messagez)
    //     }
    // }

    addProject = (req,res)=>{
        const project = new Project(req.body)
        console.log(req.body)
        console.log(project)

        project.save().then((response)=>{
            return  res.status(200).send('Posted Successfully')
        
        }).catch((error)=>{
            console.log(error)
            return res.status(500).send(error)
        })
    }

    deleteProject= async(req,res)=>{
        try{
            const id = req.params?.id;
            const query = { _id : new mongodb.ObjectId(id)}
            const result = await Project.deleteOne(query)

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

    editproject= async(req,res)=>{
        try{
            const id = req.params?.id;
            const project = req.body;
            const query = {_id: new mongodb.ObjectId(id)}
            const result = await Project.updateOne(query, {$set:project});
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


    getProjects=async(req,res)=>{
        const query=[
            {
                "$lookup": {
                    from: 'clients',
                    let: {
                        id: {
                            $toObjectId: '$client'
                        }
                    },
                    "pipeline": [
                        {
                            "$match": {
                                "$expr": {
                                    "$eq": [
                                        "$_id",
                                        "$$id"
                                    ]
                                }
                            }
                        },
                        {
                            "$project": {
                                "firstname": 1,
                                "lastname":1
                            }
                        }
                    ],
                    "as": "projectwithclient"
                }
            },
            {
                "$unwind": { 
                    path : "$projectwithclient" }
            },
            {
                "$limit" : +req.query.limit || 50
            },

            {
                "$skip" : +req.query.skip || 0
            },

            {
                "$project": {
                    "projectname": 1,
                    "projecttype":1,
                    "email":1,
                    "address":1,
                    "address2":1,
                    "postalcode":1,
                    "state":1,
                    "city":1,
                    "country":1,
                    "description":1,
                    "clientname": "$projectwithclient.firstname",
                    "clientlastname":"$projectwithclient.lastname",
                    "client":1
                }
            }
        ]
        
        await Project.aggregate(query).then((response)=>{
            return res.status(200).send(response)
        }
        )   

    }
    projectforClient=async (req,res) => {
        const id =  req?.params?.id;
        
        
        Project.find({'client':id}).then((response)=>{
            
            return res.status(200).send(response)
        })
    }



}