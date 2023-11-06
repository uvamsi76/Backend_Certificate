import express, {Request, Response,NextFunction } from "express";
import jwt from "jsonwebtoken";

export const SECRET = 'SECr3t';  // This should be in an environment variable in a real application

export const authenticateJwt = (req:Request,res:Response,next:NextFunction) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
      const token = authHeader.split(' ')[1];
      jwt.verify(token, SECRET, (err, payload) => {
        if (err) {
            console.log(err)
          return res.status(403).json({message:"unauthorised not your role"});
        }
        else if (payload && typeof payload !== "string") {
          req.headers["email"] = payload.email;
          next();
        }
        else {
          return res.status(403).json({message:"error"});
        }
      });
    } else {
      res.status(401).json({message:"UnAuthorised login first"});
      return
    }
  };