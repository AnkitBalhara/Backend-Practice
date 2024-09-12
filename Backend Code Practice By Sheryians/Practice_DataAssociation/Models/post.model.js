const mongoose = require('mongoose');

let postSchema = mongoose.Schema({
    user:{
        type : mongoose.Schema.Types.ObjectId,
        ref:"userModel"
    },
    date:{
        type : Date,
        default :Date.now
    },
    content:String,
    likes:[{
        type : mongoose.Schema.Types.ObjectId,
        ref:"userModel"
    }]
});

let postModel = mongoose.model("postModel",postSchema);

module.exports = postModel;