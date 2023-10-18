// Index des routes
// Date: 24 aout 2023
// Fournier Allan

//dependencies
const express = require('express');
const passport = require('passport');


const Usagers = require('../models/Usagers');
let userLanguage = 'fr';


//3x is = role d'un user & ses droits expliquer dans config/auth
const {isAuthentified, isAdmin, isGestion} = require('../config/auth');


const router = express.Router();

//page initiale aka login
router.get('/', (requete, reponse)=>{
    const user = requete.user;
    reponse.render(`login`, {
        'title': 'Login',
        user : user,
            });
});

//le post si bien authentifier, redirect a menu else login(meme page) '/'
router.post('/userLogin', (requete, reponse, next) => {
    passport.authenticate('local', {
        successRedirect: '/village',
        failureRedirect: '/',
        failureFlash: true
    })(requete, reponse, next);
    }
);
//set du language de l'utilisateur
router.get('/setLanguage/:lang', (req, res) => {
    const lang = req.params.lang; 
    req.session.userLanguage = lang; 
    userLanguage = lang;
    res.redirect('back'); 
    console.log(userLanguage);
    console.log("Langue sélectionnée : ", lang);
  });
//page menu
router.get('/village', isAuthentified, (requete, reponse) => {
    const userLanguage = requete.session.userLanguage || 'fr';
    Usagers.findOne({ email: requete.session.passport.user })
    .populate('inventaire')
    .then(user => {
        reponse.render('village', {
            'title': 'village',
            'user': user,
            'translations': reponse.locals.translations[userLanguage],
        });
    })
    .catch(err => {
        console.error(err);
        reponse.status(500).send('Erreur lors de la récupération des données.');
    });
});

router.get('/taverne', isAuthentified, (requete, reponse)=>{
    const userLanguage = requete.session.userLanguage || 'fr';
    const user = requete.user;
    reponse.render(`taverne`, {
        'title': 'taverne',
        user : user,
        userLanguage : userLanguage,
        'translations': reponse.locals.translations[userLanguage],
    });
});
router.get('/guide', (requete, reponse)=>{
    const userLanguage = requete.session.userLanguage || 'fr';
    const user = requete.user;
    reponse.render(`guide`, {
        'title': 'Guide de jeu',
        user : user,
        'translations': reponse.locals.translations[userLanguage],
    });
});
// bouton quitter qui renvoit à page login '/'
router.get('/quitter', (requete, reponse, next)=>{
    requete.logOut(function(err){ 
        if (err) {
            return next(err);
        }
    });
    requete.flash('success_msg', 'Vous avez été déconnecté avec succès !');
    reponse.redirect('/')
});


// toutes les autres pages qu'un type essaye d'access retour login
router.get('*', (requete, reponse)=>{
    reponse.render(`login`, {
        'title': 'Login',
            });
});

module.exports = router;
