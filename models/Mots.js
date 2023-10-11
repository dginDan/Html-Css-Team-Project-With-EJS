// schéma de données pour les Livres utilisant mongoose 7 (pas de callback...)
// Date: 10 aout 2023
// Alain Pilon

const mongoose = require('mongoose');

let schemaTraduction = mongoose.Schema({
    _id: {
        type: String,
        required: true
    },
    nomVariable: {
        type: String,
        required: true
    },
    francais: {
        type: String,
        required: true        
    },
    anglais: {
        type: String,
        required: true
    },
    
});

let Mots = module.exports = mongoose.model('traduction', schemaTraduction);
