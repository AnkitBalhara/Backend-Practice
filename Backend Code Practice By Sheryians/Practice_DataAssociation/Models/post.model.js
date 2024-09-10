const mongoose = require('mongoose');

let postSchema = mongoose.Schema({
    postDate :String,
    user:{
        type : mongoose.Schema.Types.ObjectId,
        ref:"user.model"
    },
    date:{
        type : Date,
        default :Date.now
    },
    content:String,
    likes:[{
        type : mongoose.Schema.Types.ObjectId,
        ref:"user.model"
    }]
})

let postModel = mongoose.model("postModel",postSchema);

module.exports = postModel;