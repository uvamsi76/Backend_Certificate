"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.courseContentSchema = exports.timeSchema = exports.descriptionSchema = exports.titleSchema = exports.categoryEnum = exports.urlSchema = exports.uadminschema = exports.purchasedCourseSchema = exports.wholeNumberSchema = exports.countryEnum = exports.performanceschema = exports.studentschema = exports.publishedCourseSchema = exports.idsschema = void 0;
const zod_1 = require("zod");
exports.idsschema = zod_1.z.string().refine((val) => /^[0-9a-fA-F]{24}$/.test(val));
exports.publishedCourseSchema = zod_1.z.object({
    courseId: exports.idsschema,
    isCompleted: zod_1.z.boolean(),
});
exports.studentschema = zod_1.z.object({
    courseId: zod_1.z.string(),
    userIds: zod_1.z.array(exports.idsschema),
    no_of_active_students: zod_1.z.bigint()
});
exports.performanceschema = zod_1.z.object({
    courseId: exports.idsschema,
    sales: zod_1.z.number()
});
var countryEnum;
(function (countryEnum) {
    countryEnum["India"] = "India";
    countryEnum["America"] = "America";
    countryEnum["China"] = "China";
    countryEnum["Pakistan"] = "Pakistan";
})(countryEnum = exports.countryEnum || (exports.countryEnum = {}));
exports.wholeNumberSchema = zod_1.z.number().refine(value => value === Math.round(value), {
    message: 'Value must be a whole number',
});
exports.purchasedCourseSchema = zod_1.z.object({
    courseId: exports.idsschema,
    active: zod_1.z.boolean(),
    isCompleted: zod_1.z.boolean(),
    status: exports.wholeNumberSchema.refine((val) => val >= 0 && val <= 100)
});
exports.uadminschema = zod_1.z.object({
    isAdmin: zod_1.z.boolean(),
    adminId: exports.idsschema.nullable()
});
exports.urlSchema = zod_1.z.string().refine((value) => {
    const urlPattern = /^(https?|ftp):\/\/[^\s\/$.?#].[^\s]*$/;
    return urlPattern.test(value);
}, {
    message: 'Invalid URL format',
});
var categoryEnum;
(function (categoryEnum) {
    categoryEnum["ArtificialIntelligence"] = "ArtificialIntelligence";
    categoryEnum["WebDevelopment"] = "WebDevelopment";
    categoryEnum["AndroidDevelopment"] = "AndroidDevelopment";
    categoryEnum["DevOps"] = "DevOps";
    categoryEnum["DataScience"] = "DataScience";
})(categoryEnum = exports.categoryEnum || (exports.categoryEnum = {}));
exports.titleSchema = zod_1.z.string().min(3, { message: "title too short" }).max(100, { message: "title too Long" });
exports.descriptionSchema = zod_1.z.string().min(5, { message: "description too short" }).max(400, { message: "description too short" });
exports.timeSchema = zod_1.z.string().regex(/^(\d{1,2})[h,H]:(\d{1,2})[m,M]$/);
const subtopicSchema = zod_1.z.object({
    subTopicTitle: exports.titleSchema,
    subTopicDescription: exports.descriptionSchema.nullable(),
    subTopicDuration: exports.timeSchema,
    subTopicResourse: exports.urlSchema
});
const sectionSchema = zod_1.z.object({
    sectionTitle: exports.titleSchema,
    sectionDuration: exports.descriptionSchema.nullable(),
    noofsubtopics: exports.wholeNumberSchema,
    subtopics: zod_1.z.array(subtopicSchema)
});
exports.courseContentSchema = zod_1.z.object({
    no_of_sections: exports.wholeNumberSchema,
    sections: zod_1.z.array(sectionSchema)
});
//   courseContent:{
//     no_of_sections:{type:Number},//1,
//     sections:[{
//       sectionTitle:{type:String},//"Introduction",
//       sectionDuration:{type:String},//"2h:45m",
//       noofsubtopics:{type:Number},//2,
//       subtopics:[
//         {
//           subTopicTitle:{type:String},//"Welcome to course",
//           subTopicDescription:{type:String},//"welcoming to course",
//           subTopicDuration:{type:String},//"0h:10m",
//           subTopicResourse:{type:String}//"Link"
//         }
//       ]
//     }]
//   }
