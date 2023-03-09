"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Authentication = void 0;
const jwt = require('jsonwebtoken');
class Authentication {
    tokenizer(user) {
        return jwt.sign(user, process.env.secret_key);
        // jwt.sign(user,process.env.secret_key, expiry timeee)
    }
    isAuthenticated(req, res, next) {
        const header = req.headers['authorization'];
        const token = header.split(' ')[1];
        if (token == 'null') {
            res.status(403).send("Errror");
        }
        // console.log(jwt.verify(token, process.env.SECRET_KEY));
        // req.user = 
        // jwt.verify   
        else {
            try {
                jwt.verify(token, process.env.SECRET_KEY);
                return next();
            }
            catch (error) {
                res.status(401).send(error);
            }
        }
    }
}
exports.Authentication = Authentication;
//# sourceMappingURL=authentication.js.map