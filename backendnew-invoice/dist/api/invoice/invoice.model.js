"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require('mongoose');
const invoiceSchema = new mongoose.Schema({
    clientname: String,
    projectname: String,
    projecttype: String,
    createdBy: String,
    issuedate: String,
    duedate: String,
    invoicenumber: String,
    itemdetails: [{
            itemsdetails: String,
            quantity: Number,
            rate: Number,
            tax: Number,
            amount: Number,
        }],
    subtotal: Number,
    discount: Number,
    total: Number,
});
const projectSchema = new mongoose.Schema({
    projectname: String,
});
exports.default = mongoose.model('Invoice', invoiceSchema);
//# sourceMappingURL=invoice.model.js.map