const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var tokenSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    refeshToken:{
        type:String,
    },
    publicKey:{
        type:String,
    },
    privateKey:{
        type:String,
    },
    refeshTokenUsed:{
        type:Array,
        default:[]
    }
},{
timestamps:true
});

//Export the model
module.exports = mongoose.model('Token', tokenSchema);