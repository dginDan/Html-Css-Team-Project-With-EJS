// model pour les usagers
// Date: 24 aout 2023
// Fournier Allan

const mongoose = require('mongoose');

let schemaUsager = mongoose.Schema({
    _id: {
        type: String,
        required: true
    },
    nom: {
        type: String,
        required: true        
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    nomImage: {
        type: String,
        required: true,
        default: 'defaut.jpeg'
    },
    //creer la date de maintenant grace a js Date.now
    date: {
        type: Date,
        default: Date.now 
    },
    roles: {
        type: Array,
        required: true,
        default: ["normal"]
    },
    characterClass: {
        type: String,
        enum: ['Warrior', 'Mage', 'Archer']  // Les classes disponibles
      },
    gold: {
        type: String,
        required: false
    },
    sword: {
        type:String,
        required:false
    }
});

let Usagers = module.exports = mongoose.model('usagers', schemaUsager);