"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require('mongoose');
const settings = new mongoose.Schema({
    client: String,
    project: String
}, { capped: { max: 1, size: 1 } });
exports.default = mongoose.model('Setting', settings);
//# sourceMappingURL=settings.model.js.map