import {z} from "zod"

export const idsschema =z.string().refine((val) => /^[0-9a-fA-F]{24}$/.test(val));
export const publishedCourseSchema = z.object({
    courseId: idsschema,
    isCompleted: z.boolean(),
  }); 

export const studentschema= z.object({
    courseId:z.string(),
    userIds:z.array(idsschema),
    no_of_active_students: z.bigint()
  })
export const performanceschema= z.object({
    courseId:idsschema,
    sales:z.number()
})

export enum countryEnum {
    India="India",
    America="America",
    China="China",
    Pakistan="Pakistan"
} 
export const wholeNumberSchema = z.number().refine(value => value === Math.round(value), {
    message: 'Value must be a whole number',
});
export const purchasedCourseSchema = z.object({
    courseId: idsschema,
    active: z.boolean(),
    isCompleted: z.boolean(),
    status:wholeNumberSchema.refine((val)=>val>=0 && val<=100)
  });

export const uadminschema = z.object({
    isAdmin:z.boolean(),
    adminId:idsschema.nullable()
})

export const urlSchema = z.string().refine((value) => {
    const urlPattern = /^(https?|ftp):\/\/[^\s\/$.?#].[^\s]*$/;
    return urlPattern.test(value);
  }, {
    message: 'Invalid URL format',
  });
export enum categoryEnum{
    ArtificialIntelligence="ArtificialIntelligence",
    WebDevelopment = "WebDevelopment",
    AndroidDevelopment = "AndroidDevelopment",
    DevOps="DevOps",
    DataScience="DataScience"
  }

export const titleSchema=z.string().min(3,{message:"title too short"}).max(100,{message:"title too Long"})
export const descriptionSchema=z.string().min(5,{message:"description too short"}).max(400,{message:"description too short"})

export const timeSchema=z.string().regex(/^(\d{1,2})[h,H]:(\d{1,2})[m,M]$/)

const subtopicSchema=z.object({
    subTopicTitle:titleSchema,
    subTopicDescription:descriptionSchema.nullable(),
    subTopicDuration:timeSchema,
    subTopicResourse:urlSchema
})
const sectionSchema=z.object({
    sectionTitle:titleSchema,
    sectionDuration:descriptionSchema.nullable(),
    noofsubtopics:wholeNumberSchema,
    subtopics:z.array(subtopicSchema)
})
export const courseContentSchema=z.object({
    no_of_sections:wholeNumberSchema,
    sections:z.array(sectionSchema)
})


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