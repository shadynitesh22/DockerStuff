"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const invoice_controller_1 = require("./invoice.controller");
const express = require('express');
const route = express.Router();
const invoicectrl = new invoice_controller_1.InvoiceController();
route.post('/addinvoice', invoicectrl.addInvoice);
route.get('/getinvoice', invoicectrl.getInvoices);
route.get('/getinvoice/:id', invoicectrl.getInvoice);
route.put('/editinvoice/:id', invoicectrl.editinvoice);
route.delete('/deleteinvoice/:id', invoicectrl.deleteInvoice);
route.get('/getclient', invoicectrl.forinvoice);
route.post('/sendemail', invoicectrl.sendemail);
module.exports = route;
//# sourceMappingURL=index.js.map