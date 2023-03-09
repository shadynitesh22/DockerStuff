"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectController = void 0;
const mongodb = __importStar(require("mongodb"));
const project_model_1 = __importDefault(require("./project.model"));
class ProjectController {
    constructor() {
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
        this.getProject = (req, res) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const id = (_a = req.params) === null || _a === void 0 ? void 0 : _a.id;
                const query = { _id: new mongodb.ObjectId(id) };
                const project = yield project_model_1.default.findOne(query);
                if (project) {
                    res.status(200).send(project);
                }
                else {
                    res.status(404).send(`Client with ID: ${id} not found`);
                }
            }
            catch (error) {
                res.status(404).send(`Client with ID: ${req.params.id} not found`);
            }
        });
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
        this.addProject = (req, res) => {
            const project = new project_model_1.default(req.body);
            console.log(req.body);
            console.log(project);
            project.save().then((response) => {
                return res.status(200).send('Posted Successfully');
            }).catch((error) => {
                console.log(error);
                return res.status(500).send(error);
            });
        };
        this.deleteProject = (req, res) => __awaiter(this, void 0, void 0, function* () {
            var _b;
            try {
                const id = (_b = req.params) === null || _b === void 0 ? void 0 : _b.id;
                const query = { _id: new mongodb.ObjectId(id) };
                const result = yield project_model_1.default.deleteOne(query);
                if (result && result.deletedCount) {
                    res.status(202).send(`Removed an client: ID ${id}`);
                }
                else if (!result) {
                    res.status(400).send(`Failed to remove an client: ID ${id}`);
                }
                else if (!result.deletedCount) {
                    res.status(404).send(`Failed to find an client: ID ${id}`);
                }
            }
            catch (error) {
                res.status(400).send(error.message);
            }
        });
        this.editproject = (req, res) => __awaiter(this, void 0, void 0, function* () {
            var _c;
            try {
                const id = (_c = req.params) === null || _c === void 0 ? void 0 : _c.id;
                const project = req.body;
                const query = { _id: new mongodb.ObjectId(id) };
                const result = yield project_model_1.default.updateOne(query, { $set: project });
                if (result && result.matchedCount) {
                    res.status(200).send(`Updated Client ID: ${id}`);
                }
                else if (!result.matchedCount) {
                    res.status(404).send(`Failed to find Client with ID ${id}`);
                }
                else {
                    res.status(304).send(`Failed to find Client with ID ${id}`);
                }
            }
            catch (error) {
                res.status(400).send(error.message);
            }
        });
        this.getProjects = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const query = [
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
                                    "lastname": 1
                                }
                            }
                        ],
                        "as": "projectwithclient"
                    }
                },
                {
                    "$unwind": {
                        path: "$projectwithclient"
                    }
                },
                {
                    "$limit": +req.query.limit || 50
                },
                {
                    "$skip": +req.query.skip || 0
                },
                {
                    "$project": {
                        "projectname": 1,
                        "projecttype": 1,
                        "email": 1,
                        "address": 1,
                        "address2": 1,
                        "postalcode": 1,
                        "state": 1,
                        "city": 1,
                        "country": 1,
                        "description": 1,
                        "clientname": "$projectwithclient.firstname",
                        "clientlastname": "$projectwithclient.lastname",
                        "client": 1
                    }
                }
            ];
            yield project_model_1.default.aggregate(query).then((response) => {
                return res.status(200).send(response);
            });
        });
        this.projectforClient = (req, res) => __awaiter(this, void 0, void 0, function* () {
            var _d;
            const id = (_d = req === null || req === void 0 ? void 0 : req.params) === null || _d === void 0 ? void 0 : _d.id;
            project_model_1.default.find({ 'client': id }).then((response) => {
                return res.status(200).send(response);
            });
        });
    }
}
exports.ProjectController = ProjectController;
//# sourceMappingURL=project.controller.js.map