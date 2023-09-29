// Index des routes
// Date: 24 aout 2023
// Fournier Allan

//dependencies
const express = require('express');
const passport = require('passport');

//3x is = role d'un user & ses droits expliquer dans config/auth
const {isAuthentified, isAdmin, isGestion} = require('../config/auth');
const { error } = require('console');

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
        successRedirect: '/menu',
        failureRedirect: '/',
        failureFlash: true
    })(requete, reponse, next);
    }
);
//page menu
router.get('/menu', isAuthentified, (requete, reponse)=>{
    const user = requete.user;
    console.log(requete.user);
    reponse.render(`menu`, {
        'title': 'Menu',
        user : user 
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