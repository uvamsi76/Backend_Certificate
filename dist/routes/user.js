"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const auth_1 = require("../middleware/auth");
// import {handlesignup ,handlelogin ,handlecourse,handlegetpurchasedcourse} from "../controllers/user"
const user_1 = require("../controllers/user");
const userrouter = express_1.default.Router();
userrouter.use(express_1.default.json());
userrouter.use((0, cors_1.default)());
userrouter.get('/getcertificate', user_1.verifyhash);
userrouter.post('/generatecerificate', auth_1.authenticateJwt, user_1.generatehash);
userrouter.post('/login', user_1.handlelogin);
exports.default = userrouter;
