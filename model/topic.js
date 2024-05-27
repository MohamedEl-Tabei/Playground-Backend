const Schema=require("../base/schema")
const mongoose=require("mongoose");
const Model=require("../base/model")
const schema=new mongoose.Schema(Schema.topic);




module.exports= mongoose.model("Topic",schema)