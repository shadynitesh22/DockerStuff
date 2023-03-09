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
exports.InvoiceController = void 0;
const invoice_model_1 = __importDefault(require("./invoice.model"));
const mongodb = __importStar(require("mongodb"));
const clients_model_1 = __importDefault(require("../clients/clients.model"));
const nodemailer = require('nodemailer');
class InvoiceController {
    constructor() {
        this.addInvoice = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const invoice = new invoice_model_1.default(req.body);
            invoice.save().then((response) => {
                return res.status(200).send(response.id);
            }).catch((error) => {
                console.log(error);
                return res.status(500).send(error);
            });
            //     if(invoice.){
            //         res.status(200).send(`New Invoice Created with ID: ${invoice.insertedId}`)
            //     }
            //     else{
            //         res.status(500).send(`Failed to create invoice`)
            //     }
            // }catch(error){
            //     res.status(400).send(error.message)
            // }
        });
        this.getInvoices = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const invoice = yield invoice_model_1.default.find();
                res.status(200).send(invoice);
            }
            catch (error) {
                res.status(400).send(error.message);
            }
        });
        this.getInvoice = (req, res) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const id = (_a = req.params) === null || _a === void 0 ? void 0 : _a.id;
                const query = { _id: new mongodb.ObjectId(id) };
                const invoice = yield invoice_model_1.default.findOne(query);
                if (invoice) {
                    res.status(200).send(invoice);
                }
                else {
                    res.status(404).send(`Could not find invoice with ID ${id}`);
                }
            }
            catch (error) {
                res.status(400).send(`Could not find invoice with ID ${req.params.id}`);
            }
        });
        this.editinvoice = (req, res) => __awaiter(this, void 0, void 0, function* () {
            var _b;
            try {
                const id = (_b = req === null || req === void 0 ? void 0 : req.params) === null || _b === void 0 ? void 0 : _b.id;
                const invoice = req.body;
                const query = { _id: new mongodb.ObjectId(id) };
                const result = yield invoice_model_1.default.updateOne(query, { $set: invoice });
                if (result && result.matchedCount) {
                    res.status(200).send(`Updated invoice ID: ${id}`);
                }
                else if (!result.matchedCount) {
                    res.status(404).send(`Failed to find invoice with ID ${id}`);
                }
                else {
                    res.status(304).send(`Failed to find Client with ID ${id}`);
                }
            }
            catch (error) {
                res.status(400).send(error.message);
            }
        });
        this.deleteInvoice = (req, res) => __awaiter(this, void 0, void 0, function* () {
            var _c;
            try {
                const id = (_c = req === null || req === void 0 ? void 0 : req.params) === null || _c === void 0 ? void 0 : _c.id;
                const query = { _id: new mongodb.ObjectId(id) };
                const result = yield invoice_model_1.default.deleteOne(query);
                if (result && result.deletedCount) {
                    res.status(202).send(`Removed an invoice: ID ${id}`);
                }
                else if (!result) {
                    res.status(400).send(`Failed to remove an invoice: ID ${id}`);
                }
                else if (!result.deletedCount) {
                    res.status(404).send(`Failed to find an invoice: ID ${id}`);
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
            yield clients_model_1.default.aggregate(query).then((response) => {
                res.status(200).send(JSON.stringify(response));
            });
        });
        this.sendemail = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const transporter = nodemailer.createTransport({
                //     service: 'SendinBlue', // no need to set host or port etc.
                //     // host:"smtp-relay.sendinblue.com",
                //     // port:587,
                service: 'gmail',
                auth: {
                    user: process.env.user_email,
                    pass: process.env.user_password
                }
            });
            // var transporter = nodemailer.createTransport({
            //     host: "smtp.mailtrap.io",
            //     port: 2525,
            //     auth: {
            //       user: "83bff7084f1870",
            //       pass: "279c644c5b5c84"
            //     }
            //   });
            yield transporter.sendMail({
                from: 'aayushshrestha999@gmail.com',
                to: 'aayushshrestha999@gmail.com',
                subject: 'Signup verification',
                text: "Please verify your email"
            })
                .then((res) => {
                console.log(res);
            })
                .catch((err) => console.log("Failed ", err));
        });
    }
}
exports.InvoiceController = InvoiceController;
//# sourceMappingURL=invoice.controller.js.map