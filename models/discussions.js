const mongoose = require('mongoose');


let schemaDiscussions = mongoose.Schema({
    _id: {
        type: String,
        required: true
    },
    titre: {
        type: String,
        required: true
    },
    auteur: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    commentaires: [ ]
   
});

let Discussion = module.exports = mongoose.model('discussion', schemaDiscussions);