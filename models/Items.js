const mongoose = require('mongoose');

let schemaItem = mongoose.Schema({
    
    _id:  { 
        type: String,
    },
    nom: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    categorie: {
        type: String,
        required: true,
    },
    prix: {
        type: String,  
        required: true
    },
    imageItem: {
        type: String,
        required: true,
    }
});

let Items = mongoose.model('items', schemaItem);  

module.exports = Items;