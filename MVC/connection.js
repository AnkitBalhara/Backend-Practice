const mongoose = require('mongoose')

// Creating Connections...
async function connectMongoDB(url){
    return mongoose.connect(url)
    // return mongoose.connect('mongodb://localhost:27017/MERN_Stack')
}

module.exports = {connectMongoDB}