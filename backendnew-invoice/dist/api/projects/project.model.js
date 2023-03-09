"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require('mongoose');
const projectSchema = new mongoose.Schema({
    // unique:true,  npm install --save mongoose-unique-validator  
    client: String,
    projectname: { type: String, required: true },
    projecttype: String,
    email: String,
    address: String,
    address2: String,
    postalcode: String,
    state: String,
    city: String,
    country: String,
    description: String,
});
exports.default = mongoose.model('Project', projectSchema);
//# sourceMappingURL=project.model.js.map