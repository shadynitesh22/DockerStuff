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
exports.CLientController = void 0;
const mongodb = __importStar(require("mongodb"));
const clients_model_1 = __importDefault(require("./clients.model"));
const test_json_1 = __importDefault(require("../test.json"));
const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads');
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + "-" + Date.now());
    },
});
const upload = multer(storage).single("demo_image");
class CLientController {
    constructor() {
        this.getClients = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(test_json_1.default);
                console.log(req.query, "query");
                console.log(req.query.page, "page number");
                if (req.query.skip && req.query.limit) {
                    console.log("inside req query");
                    const clients = yield clients_model_1.default.find().skip(req.query.skip).limit(req.query.limit);
                    res.status(200).send(clients);
                }
                else {
                    console.log("inside else condiition");
                    const clients = yield clients_model_1.default.find();
                    res.status(200).send(clients);
                }
            }
            catch (error) {
                res.status(200).send(error.message);
            }
        });
        this.getClient = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req === null || req === void 0 ? void 0 : req.params.id;
                const query = { _id: new mongodb.ObjectId(id) };
                const client = yield clients_model_1.default.findOne(query);
                if (client) {
                    res.status(200).send(client);
                }
                else {
                    res.status(404).send(`Could not find client with id: ${id}`);
                }
            }
            catch (error) {
                res.status(404).send(`Client with ID: ${req.params.id} not found`);
            }
        });
        this.postClient = (req, res) => __awaiter(this, void 0, void 0, function* () {
            console.log('i will try to go in');
            console.log('i am in');
            console.log(req.body.client);
            console.log('trying to work it out');
            const client = new clients_model_1.default(JSON.parse(req.body.client));
            console.log(JSON.parse(req.body.client).firstname);
            console.log(client);
            const push = yield client.save().then((response) => {
                console.log('added client');
                return res.status(200).send('Client Added');
            }).catch((error) => {
                console.log(error);
                return res.status(500).send(error);
            });
        });
        this.editclient = (req, res) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const id = (_a = req === null || req === void 0 ? void 0 : req.params) === null || _a === void 0 ? void 0 : _a.id;
                const client = req.body;
                const query = { _id: new mongodb.ObjectId(id) };
                const result = yield clients_model_1.default.updateOne(query, { $set: client });
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
        this.deleteClient = (req, res) => __awaiter(this, void 0, void 0, function* () {
            var _b;
            try {
                const id = (_b = req === null || req === void 0 ? void 0 : req.params) === null || _b === void 0 ? void 0 : _b.id;
                const query = { _id: new mongodb.ObjectId(id) };
                const result = yield clients_model_1.default.deleteOne(query);
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
        this.forinvoice = (req, res) => __awaiter(this, void 0, void 0, function* () {
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
                        'firstname': 1,
                        'lastname': 1
                    }
                }
            ];
            clients_model_1.default.aggregate(query).then((response) => {
                console.log(response);
            });
        });
        this.clientwithprojects = (req, res) => __awaiter(this, void 0, void 0, function* () {
            var _c;
            const cid = (_c = req === null || req === void 0 ? void 0 : req.params) === null || _c === void 0 ? void 0 : _c.id;
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
                                    "_id": 1
                                }
                            }],
                        "as": "clientwithprojects"
                    }
                }, {
                    '$project': {
                        'projects': '$clientwithprojects',
                        'firstname': 1,
                        'lastname': 1
                    }
                }
            ];
            clients_model_1.default.aggregate(query).then((response) => {
                console.log(response);
                res.status(200).send(response);
            });
        });
        this.imgdemo = (req, res) => __awaiter(this, void 0, void 0, function* () {
            console.log(req.body);
            console.log("*****************************************************************");
            console.log(JSON.parse(req.body.client));
            console.log(req.body.client);
            console.log('image demo working');
            res.send("Ok thanks");
            // console.log(req.file);
        });
    }
}
exports.CLientController = CLientController;
//# sourceMappingURL=clients.controller.js.map