const mongoose = require('mongoose')

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
// let model_usedHere = mongoose.model("Model_In_Mongo_Name",userSchema)
// module.exports = model_usedHere;
let model_usedHere = mongoose.model("Model_In_Mongo_Name", userSchema);

module.exports = model_usedHere;
