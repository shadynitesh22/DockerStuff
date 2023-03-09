"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const crypt = require("crypto");
const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    username: { type: String, required: true },
    salt: { type: String },
    phoneNumber: { type: String }
});
userSchema.pre('save', function (next) {
    var user = this;
    if (!user.isModified('password'))
        return next();
    const salt = crypt.randomBytes(8).toString('base64');
    const hash = crypt.pbkdf2Sync(user.password, salt, 5000, 64, 'sha512').toString('hex');
    //  bcrypt.genSalt(10, function(err, salt){     
    //   if(err) return next(err);     
    //   bcrypt.hash(user.password, salt, function(err,hash){
    //    if(err) return next(err);
    user.salt = salt;
    user.password = hash;
    next();
});
userSchema.methods = {
    authentication(password, user, done) {
        const pass = crypt.pbkdf2Sync(password, user.salt, 5000, 64, 'sha512').toString('hex');
        if (user.password === pass) {
            return done(null, true);
        }
        else {
            return done('Invalid Credentials', false);
        }
    }
};
exports.default = mongoose.model('User', userSchema);
//# sourceMappingURL=user.model.js.map