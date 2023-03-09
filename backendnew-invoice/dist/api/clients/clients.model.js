"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require('mongoose');
const clientSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    email: String,
    phone: String,
    address: String,
    address2: String,
    postalcode: Number,
    state: String,
    city: String,
    country: String,
    description: String,
    image: String,
});
exports.default = mongoose.model('Client', clientSchema);
//# sourceMappingURL=clients.model.js.map