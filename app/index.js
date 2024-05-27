const express=require("express")
const app=express();
const cors=require("cors")
const Router=require("../base/router")
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use("/topic",Router.topic);
app.use("/mcq",Router.mcq);
module.exports=app