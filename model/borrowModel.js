const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
const borrowSchema = new mongoose.Schema({
    prodId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Products",
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    dateIn:{
        type:Date,
        required:true,
    },
    dateOut:{
        type:Date,
        required:true,
    },
    status:{
        type:String,
        default:'in progress'
    },
    quantity:{
        type:Number,
    }
},{timestamps:true});

//Export the model
module.exports = mongoose.model('Borrow', borrowSchema);