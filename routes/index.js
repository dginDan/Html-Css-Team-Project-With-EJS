// Index des routes
// Date: 24 aout 2023
// Fournier Allan

//dependencies
const express = require('express');
const passport = require('passport');
const Mots=require('../models/Mots');



const fonctRoute = require('../config/fonctRoute').fonctRoute;

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

router.get('/ajoutMot', (requete,reponse)=>{
    reponse.render('ajoutMots', {
        titrePage:"Ajout d'un mot"
    });
});

router.post('/ajoutMot', (requete, reponse)=>{
    console.log('dans router.post');
    fonctRoute.verifMot(requete,reponse);
});


router.get('/listeMots', (requete, reponse)=>{
    
    const usager = requete.user;
    Mots.find({}).exec()
        .then(listeMots=>{
            reponse.render('listeMots', {
                'titrePage': 'Page de la liste des variables de mots a traduire',
                 usager: usager,
                'liste':listeMots
            });

        })
        .catch(err=>{throw err;})
   
});

router.get('/editerMot/:_id',  (requete, reponse) => {
    console.log(`dans le edit GET`);
    const usager = requete.user;
    const id = requete.params._id;
    Mots.findOne({ "_id": id }).exec()
        .then(mot => {
            if (mot) {
                console.log(`dans le edit FoneUpdate`);
                const { nomVariable, francais, anglais } = mot;
                reponse.render('editerMot', {
                    'titrePage': 'Page de modification',
                    usager: usager,
                    nomVariable,
                    anglais,
                    francais,
                    id
                });
            } else console.log("veuillez avertir l'administrateur (routeur editer mot)");
        }
        )
        .catch(err => console.log(err));

});

router.post('/editerMot/:_id',  (requete, reponse) => {
    console.log(`dans le post`);
    const usager = requete.user;
    const { nomVariable, francais, anglais} = requete.body;
    let erreurs = [];
    const id = requete.params._id;

    if ((typeof nomVariable === null || nomVariable.trim().length === 0) || (typeof francais === null || francais.trim().length === 0) || (typeof anglais === null || anglais.trim().length === 0) ) {
        erreurs.push({ msg: 'remplir toute les cases du formulaire!' });
    }

    if (erreurs.length > 0) {
        reponse.render('editerMot', {
            'titrePage': 'Page de modification',
            usager: usager,
            errors: erreurs,
            anglais,
            nomVariable,
            francais,
            id
        });
    } else {
        const modificationsMot = { nomVariable, francais, anglais };
        Mots.findOneAndUpdate({ '_id': id }, modificationsMot)
            .then(mot => {
                console.log(`dans le    fupdate`);
                requete.flash('success_msg', 'Mot  modifié avec succes');
                console.log(`avant le redirect`);
                reponse.redirect('/listeMots');
                console.log(`apres le redirect`);
            })
            .catch(err => console.log('modification du mot dans la BD ne fonctionne pas' + err));

    }
});



// toutes les autres pages qu'un type essaye d'access retour login
router.get('*', (requete, reponse)=>{
    reponse.render(`login`, {
        'title': 'Login',
            });
});

module.exports = router;