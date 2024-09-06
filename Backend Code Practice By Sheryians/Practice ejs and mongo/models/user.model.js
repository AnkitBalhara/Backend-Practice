const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/Ejs_and_Mongo")

let userSchema =mongoose.Schema({
    username:String,
    number:Number,
    image:String,
    email:String,
});

let userModel = mongoose.model("userModel",userSchema);

module.exports = userModel;