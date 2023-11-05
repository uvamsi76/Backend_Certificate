import express, {Request, Response,NextFunction } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import jwt from "jsonwebtoken";
import {SECRET,authenticateJwt} from "../middleware/auth"
import {userSchema , userloginSchema} from "../zodschemas/userschema"
// import {handlesignup ,handlelogin ,handlecourse,handlegetpurchasedcourse} from "../controllers/user"
import {verifyhash ,generatehash ,handlelogin} from "../controllers/user"

const userrouter=express.Router();
userrouter.use(express.json());
userrouter.use(cors())

userrouter.get('/getcertificate',verifyhash)

userrouter.post('/generatecerificate',authenticateJwt,generatehash)

userrouter.post('/login',handlelogin)


export default userrouter