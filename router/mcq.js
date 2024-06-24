const express=require("express")
const Middleware=require("../base/middleware")
const Controller=require("../controller/mcq")
const router=express.Router()

router.route("/createmcqs").post(Middleware.checkPassword,Controller.createMCQs)
router.route("/createmcqstest").post(Controller.createMCQsTest)
router.route("/getmcqsbytopicnumber").post(Controller.getMCQsBytopicNumber)



module.exports=router