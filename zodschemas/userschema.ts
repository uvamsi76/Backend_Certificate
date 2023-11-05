import { date, z } from "zod"
import {countryEnum, purchasedCourseSchema, uadminschema, urlSchema, wholeNumberSchema} from "./common"

export const userloginSchema = z.object({
  email:z.string().email({message:"enter valid email address"}),
  password:z.string().min(8,{message:"Incorrect password"}).max(20,{message:"Incorrect password"}).regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z])()(?=.*[!@#$%^&*]).{8,}$/gm,{message:"Incorrect password"})
})
export const userSchema = z.object({
    firstname:z.string().max(20,{message:"firstname max limit is 20"}).min(5,{message:"firstname min limit is 5"}),
    lastname:z.string().max(20,{message:"lastname max limit is 20"}).min(5,{message:"lastname min limit is 5"}),//"Uppuluri",
    // username:z.string().max(15,{message:"username max limit is 15"}).min(5,{message:"username min limit is 5"}),//"uvamsi76",
    email:z.string().email({message:"enter valid email address"}),//"uvamsi76@gmail.com",
    // phoneno:z.string().refine((value) => /^\d{10}$/.test(value),{message:"phoneno max limit is 10 and it should only contain numbers"}),//"6300854181",
    password:z.string().min(8).max(20,{message:"password max limit is 20"}).regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z])()(?=.*[!@#$%^&*]).{8,}$/gm,{message:"password should contain A-Z a-z 0-9 !@#$%^&* each"}),//"Uvamsi76@",
    // country:z.enum([countryEnum.America,countryEnum.China,countryEnum.India,countryEnum.Pakistan]).refine((val)=>val in countryEnum,{message:"country select only from limit"}),
    // DOB:z.date().refine((val)=>val < new Date(),{message:"enter valid date"}),//"20/1/2001",
    // profilePic:urlSchema//"link"
});
export type UserType = z.infer<typeof userSchema>;
