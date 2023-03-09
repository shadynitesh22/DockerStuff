import Invoice from './invoice.model'
import * as mongodb from 'mongodb'
import Client from '../clients/clients.model';

const  nodemailer = require('nodemailer')




export class InvoiceController {

    addInvoice = async (req, res) => {
        const invoice = new Invoice(req.body);
        invoice.save().then((response) => {
            return res.status(200).send(response.id)

        }).catch((error) => {
            console.log(error)
            return res.status(500).send(error)
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
    }

    getInvoices = async (req, res) => {
        try {
            const invoice = await Invoice.find();
            res.status(200).send(invoice)
        }
        catch (error) {
            res.status(400).send(error.message)
        }
    }
    getInvoice = async (req, res) => {
        try {
            const id = req.params?.id
            const query = { _id: new mongodb.ObjectId(id) };
            const invoice = await Invoice.findOne(query)
            if (invoice) {
                res.status(200).send(invoice)
            }
            else {
                res.status(404).send(`Could not find invoice with ID ${id}`)
            }
        }
        catch (error) {
            res.status(400).send(`Could not find invoice with ID ${req.params.id}`)
        }
    }


    editinvoice = async (req, res) => {
        try {
            const id = req?.params?.id;
            const invoice = req.body;
            const query = { _id: new mongodb.ObjectId(id) };
            const result = await Invoice.updateOne(query, { $set: invoice })

            if (result && result.matchedCount) {
                res.status(200).send(`Updated invoice ID: ${id}`);
            }
            else if (!result.matchedCount) {
                res.status(404).send(`Failed to find invoice with ID ${id}`);
            }
            else {
                res.status(304).send(`Failed to find Client with ID ${id}`)
            }
        }
        catch (error) {
            res.status(400).send(error.message);
        }
    }
    deleteInvoice = async (req, res) => {
        try {
            const id = req?.params?.id;
            const query = { _id: new mongodb.ObjectId(id) };
            const result = await Invoice.deleteOne(query)

            if (result && result.deletedCount) {
                res.status(202).send(`Removed an invoice: ID ${id}`);
            } else if (!result) {
                res.status(400).send(`Failed to remove an invoice: ID ${id}`);
            } else if (!result.deletedCount) {
                res.status(404).send(`Failed to find an invoice: ID ${id}`);
            }
        }
        catch (error) {
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


        await Client.aggregate(query).then((response)=>{
            
        

            res.status(200).send(JSON.stringify(response))
            
        })
    }



    sendemail = async (req,res)=>{
        
        
        const transporter = nodemailer.createTransport({
        //     service: 'SendinBlue', // no need to set host or port etc.
        //     // host:"smtp-relay.sendinblue.com",
        //     // port:587,
            service : 'gmail', 
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

      await  transporter.sendMail({
        from: 'aayushshrestha999@gmail.com',

            to: 'aayushshrestha999@gmail.com',
            subject: 'Signup verification',
            text: "Please verify your email"
                
        })
                .then((res) => {
                console.log(res);
                })
                .catch((err) => console.log("Failed ", err))
    }
}