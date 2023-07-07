const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var requestBookSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    author:{
        type:String,
        required:true,
        unique:true,
    },
    descriptions:{
        type:String,
        required:true,
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
},{timestamps:true});

//Export the model
module.exports = mongoose.model('RequestBook', requestBookSchema);