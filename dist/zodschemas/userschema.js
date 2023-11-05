"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSchema = exports.userloginSchema = void 0;
const zod_1 = require("zod");
exports.userloginSchema = zod_1.z.object({
    email: zod_1.z.string().email({ message: "enter valid email address" }),
    password: zod_1.z.string().min(8, { message: "Incorrect password" }).max(20, { message: "Incorrect password" }).regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z])()(?=.*[!@#$%^&*]).{8,}$/gm, { message: "Incorrect password" })
});
exports.userSchema = zod_1.z.object({
    firstname: zod_1.z.string().max(20, { message: "firstname max limit is 20" }).min(5, { message: "firstname min limit is 5" }),
    lastname: zod_1.z.string().max(20, { message: "lastname max limit is 20" }).min(5, { message: "lastname min limit is 5" }),
    // username:z.string().max(15,{message:"username max limit is 15"}).min(5,{message:"username min limit is 5"}),//"uvamsi76",
    email: zod_1.z.string().email({ message: "enter valid email address" }),
    // phoneno:z.string().refine((value) => /^\d{10}$/.test(value),{message:"phoneno max limit is 10 and it should only contain numbers"}),//"6300854181",
    password: zod_1.z.string().min(8).max(20, { message: "password max limit is 20" }).regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z])()(?=.*[!@#$%^&*]).{8,}$/gm, { message: "password should contain A-Z a-z 0-9 !@#$%^&* each" }), //"Uvamsi76@",
    // country:z.enum([countryEnum.America,countryEnum.China,countryEnum.India,countryEnum.Pakistan]).refine((val)=>val in countryEnum,{message:"country select only from limit"}),
    // DOB:z.date().refine((val)=>val < new Date(),{message:"enter valid date"}),//"20/1/2001",
    // profilePic:urlSchema//"link"
});
