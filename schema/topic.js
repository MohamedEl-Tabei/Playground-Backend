const schema={
    name:{
        type:String,
        required:"Enter Topic",
        unique:true
    },
    number:{
        type:Number,
        required:"Enter Number",
        unique:true
    },
    category:
    {
        type:Number,
        default:1
    }
}
module.exports=schema