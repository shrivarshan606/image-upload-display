const express=require('express')
const mongoose=require('mongoose')
const cors=require('cors')
const multer=require('multer')
const path=require('path')
const model=require('./model/model1')

const app=express()

app.use(express.json())
app.use(cors())
app.use(express.static('public'))

mongoose.connect("mongodb://localhost:27017/gallery")

const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'public/images')
    },
    filename:(req,file,cb)=>{
        cb(null,file.fieldname+'_'+Date.now()+path.extname(file.originalname))
    }
})

const upload=multer({storage:storage})

app.post('/upload',upload.single('file'),(req,res)=>{
    model.create({image:req.file.filename})
    .then(result=>res.json(result))
    .catch(err=>res.json(err))
})

app.get('/getphoto',(req,res)=>{
    model.find()
    .then(result=>res.json(result))
    .catch(err=>res.json(err))
})




app.listen(5000,()=>{
    console.log("SERVER IS RUNNING")
})