import express, {Request, Response,NextFunction } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import jwt from "jsonwebtoken";
import {SECRET,authenticateJwt} from "../middleware/auth"
import { PrismaClient } from '@prisma/client'
import { string } from "zod";
import generateCertificate from "../util/generateCertificate";
const prisma = new PrismaClient()


const validateemail =async (email:string,password:string)=>{
    try {
        const user = await prisma.user.findFirst({
          where: {
            email: email,
          },
        });
        if(!user){
            return false
        }
        if(user.password!=password){
            return false
        }
        return user
    }
    catch(error){
        console.error('Error finding user:', error);
    }
    finally{
        await prisma.$disconnect();
    }
}

const emailvalidate =async (email:string)=>{
    try {
        const user = await prisma.user.findFirst({
          where: {
            email: email,
          },
        });
        if(!user){
            return false
        }
        return user
    }
    catch(error){
        console.error('Error finding user:', error);
    }
    finally{
        await prisma.$disconnect();
    }
}
export const verifyhash =async (req:Request,res:Response)=>{
    const hash=req.params.hash
    const decodeddata=atob(hash)
    const email=decodeddata.split(" ")[0]
    const user=await emailvalidate(email)
    if(!user){
        res.status(404).send({message:"enter valid certificate"})
        return
    }
    res.status(200).send({firstname:user.firstname,lastname:user.lastname,email:user.email,certificate:user.s3link})
}

export const generatehash =async (req:Request,res:Response)=> {
    const email = req.headers["email"]
    const password=req.headers["password"]
    if(typeof(email)!="string") return
    if(typeof(password)!="string") return
    const user=await validateemail(email,password)
    if(!user){
        res.status(404).send({message:"invalid credentials or not registered to cohort"})
        return
    }
    if(!process.env.CERT_SECRET){
        res.status(500).send({message:"certificate failed Internal error"})
        return
    }
    const data = email+" "+process.env.CERT_SECRET
    const hash=btoa(data)
    if(!hash){
        res.status(500).send({message:"certificate failed Internal error"})
        return
    }
    const name=user.firstname+user.lastname
    // generateCertificate('John Doe', 'Fullstack with harkirat', 'certificate.pdf','hbcjncdfnjxcnvouxkzc=');
    const filename="./certificate"+hash+".pdf"
    await generateCertificate(name,'Fullstack with harkirat',filename,hash)
    res.status(200).send({certificate:user.s3link,firstname:user.firstname,lastname:user.lastname,hash:hash})
    
    
    
}

export const handlelogin= async (req:Request,res:Response)=>{
        const { email, password } = req.body;
        try{
        const user = await emailvalidate(email);
        if(!user){
            res.status(403).json({ message: 'User not found' });
            return
        }
        if(user.password!=password){
          console.log(user)
          res.status(404).json({message:"Incorrect Password"})
          return
        }
        console.log(user.id)
        const token = jwt.sign({ email, password}, SECRET, { expiresIn: '1h' });
        res.json({ message: 'Logged in successfully', token ,email});
      }
      catch(err){
        res.status(500).json({message:"internal error sorry for the inconvinience"})
      }
    }

export const getcertificate= async (req:Request,res:Response)=>{
    const email=req.headers["email"]
    if(!email) return
    if(typeof(email)!="string") return
    const user=await emailvalidate(email)
    if(!user){
        res.status(404).send({message:"enter valid certificate"})
        return
    }
    res.status(200).send({user})
} 