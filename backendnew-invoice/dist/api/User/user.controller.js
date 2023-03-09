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
exports.UserController = void 0;
const user_model_1 = __importDefault(require("./user.model"));
const passport_1 = __importDefault(require("passport"));
const authentication_1 = require("../authentication/authentication");
const settings_model_1 = __importDefault(require("./settings.model"));
const jwt = require('jsonwebtoken');
class UserController {
    constructor() {
        this.tokenizer = new authentication_1.Authentication();
        this.adduser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const user = new user_model_1.default(req.body);
            yield user.save().then((response) => {
                return res.status(200).send('Posted Successfully');
            }).catch((error) => {
                return res.status(500).send(error.message);
            });
        });
        this.loginUser = (req, res, next) => {
            const user = passport_1.default.authenticate('local', (err, user) => __awaiter(this, void 0, void 0, function* () {
                if (!user) {
                    console.log('i should be here');
                    return res.status(404).send('Invalid Credentials');
                }
                const userInfo = {
                    email: user.email,
                    id: user._id
                };
                const token = yield jwt.sign(userInfo, process.env.SECRET_KEY);
                res.status(200).json({ token: token });
            }))(req, res, next);
        };
        this.userSetting = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const set = [req.body];
            const setting = new settings_model_1.default(req.body);
            yield setting.save().then((response) => {
                return res.status(200).send(response);
            }).catch((err) => {
                return res.status(500).send(err);
            });
        });
        this.getsettings = (req, res) => __awaiter(this, void 0, void 0, function* () {
            console.log("inside get settings");
            const setting = yield settings_model_1.default.find();
            res.status(200).send(setting);
        });
    }
}
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map