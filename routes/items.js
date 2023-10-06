const express = require('express');
const {isAuthentified} = require('../config/auth');
const Items = require('../models/Items');

const router = express.Router();


// Affichage de la page Shop
router.get('/shop', isAuthentified, (requete, reponse) => {
    const categorie = requete.query.categorie;
    let query = {};

    if (categorie) {
        query.categorie = categorie;
    }

    Items.find(query).exec()
        .then(items => {
            reponse.render('shop', {
                items: items
            });
        })
        .catch(err => {
            console.error(err);
            reponse.status(500).send('Erreur lors de la récupération des articles.');
        });
});

module.exports = router;