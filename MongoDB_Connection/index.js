const express = require('express')
const app = express();
const mongoose = require('mongoose')
const port = 5000;

// Creating Connections...
mongoose.connect('mongodb://localhost:27017/MERN_Stack').
then(()=>{console.log("Connected to mongoDB...")}).
catch((err)=>{console.log("Eror occured as:-",err)})

// Creating Middleware...
app.use(express.json())

// Creating Schema...
const userSchema = new mongoose.Schema({
  first_name:{
    type:String,
    required:true
  },last_name:{
    type:String
  },email:{
    type:String,
    required:true,
    unique:true
  },gender:{    
    type:String,
    required:true
  },job:{
    type:String,
    required:true
  }
},{timestamps : true})

// Creating Model..
let model_usedHere = mongoose.model("Model_In_Mongo_Name",userSchema)

// Creating Routes...

app.get('/api/users/',async (req,res)=>{
  let allDBUsers =await model_usedHere.find({})

//  let html = allDBUsers.map((users)=>{
//   console.log(users.email)
//  })
//  console.log(allDBUsers[0].first_name)
  res.send(allDBUsers)
})

app.route('/api/users/:id')
.get(async(req,res)=>{
  let userFind = await model_usedHere.findById(req.params.id);
  if(!userFind){
    res.status(400).json({Error:"Could Not Find"})
  }
  return res.json(userFind)
})
.patch(async(req,res)=>{
  let userFind = await model_usedHere.findByIdAndUpdate(req.params.id,{last_name:"Balhara"})
  return res.json({Status:"All Updated"})
})
.delete(async(req,res)=>{
  let userFind = await model_usedHere.findByIdAndDelete(req.params.id)
  res.send("Deleted Successfully...")
})

app.post('/api/users/',async (req,res)=>{
  let dataBody = req.body;
  if(!dataBody || !dataBody.first_name || !dataBody.last_name || !dataBody.email || !dataBody.gender || !dataBody.job){
    res.status(400).json({Details:"All Details are Mandotary..."})
  }
  let result = await model_usedHere.create({
        first_name:dataBody.first_name,
        last_name:dataBody.last_name,
        email:dataBody.email,
        job:dataBody.job,
        gender:dataBody.gender
      })

  // console.log(result)
  res.status(200).json({Status:"Everything is Running Smooth..."})

})

app.listen(port,()=>console.log("Server Started..."))