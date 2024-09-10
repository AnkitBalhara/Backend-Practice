const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/DataAssociation')

let userSchema = mongoose.Schema({
    username:String,
    email:{
        type : String,
        unique:true
    },
    password:String,
    age:Number,
    posts:[
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "post.model"
        }
    ]
})

let userModel = mongoose.model("userModel",userSchema);

module.exports = userModel;