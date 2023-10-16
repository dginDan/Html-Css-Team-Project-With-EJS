// Index des routes
// Date: 24 aout 2023
// Fournier Allan

//dependencies
const express = require('express');
const passport = require('passport');
const Mots=require('../models/Mots');
const Usagers = require('../models/Usagers');
let userLanguage = 'fr';
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
