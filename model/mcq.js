const mongoose=require("mongoose")
const schema=require("../base/schema")
const Schema=new mongoose.Schema(schema.mcq)




module.exports=mongoose.model("MCQ",Schema)