"use strict";
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
exports.passportSetup = void 0;
const console_1 = require("console");
const passport_1 = __importDefault(require("passport"));
const user_model_1 = __importDefault(require("../../User/user.model"));
const localstrategy = require('passport-local');
const auth = (User, email, password, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User.findOne({ 'email': email });
        if (user) {
            console.log(('inside user'));
            user.authentication(password, user, (authError, authenticated) => {
                if (authError)
                    return done(authError);
                if (authenticated) {
                    return done(null, user);
                }
            });
        }
        else {
            throw console_1.error;
        }
    }
    catch (error) {
        done(error);
    }
});
const passportSetup = () => {
    passport_1.default.use(new localstrategy({
        usernameField: 'email',
    }, (email, password, done) => {
        return auth(user_model_1.default, email, password, done);
    }));
};
exports.passportSetup = passportSetup;
//# sourceMappingURL=passport-strategy.js.map