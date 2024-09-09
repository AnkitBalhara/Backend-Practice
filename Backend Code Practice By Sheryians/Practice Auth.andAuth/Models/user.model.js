const mongoose = require('mongoose');

let connection = mongoose.connect("mongodb://localhost:27017/AuthTestPractice");

let userSchema = mongoose.Schema({
    username:String,
    email:String,
    password:String,
    number:String
})

let userModel = mongoose.model("userModel",userSchema);

module.exports = userModel;