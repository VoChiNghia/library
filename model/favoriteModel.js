const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var favoriteBookSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    listBooks:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Products'
        }
    ]
});

//Export the model
module.exports = mongoose.model('FavoriteBook', favoriteBookSchema);