import express, {Request, Response,NextFunction } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import jwt from "jsonwebtoken";
import userrouter from "../routes/user"
import * as dotenv from 'dotenv';

dotenv.config();

const PORT =3000;

const app=express();

app.use(bodyParser.json())
app.use(cors())
app.use(express.json());

console.log("test app.ts")
// app.use("/api",commonrouter)
// app.use("/api/admin",adminrouter)



app.use("/api",userrouter)



// Connect to MongoDB
// DONT MISUSE THIS THANKYOU!!
// const murl=process.env.MONGO_URL || "null"
// mongoose.connect(murl, { dbName: "codes-era" });
// console.log("murl")
app.get('/',(req,res)=>{
  res.json("working fine mowa ")
})

app.listen(PORT, () => console.log(`Server running on port ${PORT} ok`));