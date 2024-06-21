const express=require("express");
const Controller=require("../base/controller")
const Middleware=require("../base/middleware")


const router=express.Router()
router.route("/createnewtopic").post(Middleware.checkPassword,Controller.topic.createNew)
router.route("/maxMcqs").post(Controller.topic.readMaxMCQByTopicId)
router.route("/readalltopics/:category").get(Controller.topic.readAllTopics)



module.exports=router