const mongoose=require('mongoose')

const modelSchema=new mongoose.Schema({
    image:String
})

const model=mongoose.model('photoes',modelSchema)
module.exports=model