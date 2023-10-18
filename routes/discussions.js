const Discussions = require("../models/discussions");
const express = require('express');
const router = express.Router();
const mongoose =require("mongoose");
const {isAuthentified, isModerateurAuteurCommentaire,isModerateurAuteurDiscussion} = require('../config/auth');



router.get('/',isAuthentified, (requete, reponse) => {
    const userLanguage = requete.session.userLanguage || 'fr';
    const user = requete.user;
    Discussions.find({}).sort({date: -1}).exec()
    .then(listeDiscussions => {
        reponse.render('discussions/discussions', {
            titrePage: "Forum de discusions",
            user:user,
            liste:listeDiscussions,
            'translations': reponse.locals.translations[userLanguage],
        });
    })
});    

router.get('/ajouter',isAuthentified, (requete, reponse) => {
    const userLanguage = requete.session.userLanguage || 'fr';
    const user = requete.user;
       reponse.render('discussions/ajouter', {
        titrePage: "Ajout d'une discussion",
        user: user,
        'translations': reponse.locals.translations[userLanguage],
    });
});
router.post('/ajouter',isAuthentified,  (requete, reponse, next) => {
const {titre,commentaire}=requete.body;
const user = requete.user;
let erreurs=[];

       
    if ((typeof titre === null || titre.trim().length === 0 ) || (typeof commentaire === null || commentaire.trim().length === 0 ) )
    
    {
        erreurs.push({msg:'remplir toute les cases du formulaire!'});

    }
    
    if (erreurs.length > 0) {
        const userLanguage = requete.session.userLanguage || 'fr';
        const user = requete.user;
        reponse.render('discussions/ajouter', {
            'titrePage': "Ajout d'une discussion",
            user: user,
            errors: erreurs,
            titre,
            commentaire,
            'translations': reponse.locals.translations[userLanguage],
        });
    }
    else{
        let _id = new mongoose.Types.ObjectId();
        const nouvelleDate = new Date();
        const date = nouvelleDate.toDateString();
        const message =commentaire;
        const auteur=user.nom;
        const courriel=user.email
        const nouvellediscussion= new Discussions({_id,titre,auteur,date,courriel,message})
        nouvellediscussion.save()
        .then(()=>{
        requete.flash('success_msg','Discussion ajouté avec succes');
        reponse.redirect('/discussions');
        })
        .catch(err=>console.log('insertion dans la BD ne fonctionne pas'+err));
    }


});
router.get('/supprimer/:_id',isModerateurAuteurDiscussion,  (requete, reponse, next) => {
    const id = requete.params._id;
    
    Discussions.findOneAndDelete({ '_id': id }).exec()
        .then(siSupprimé => {
            requete.flash('success_msg', `La discussion a été supprimé avec succès`);
            reponse.redirect('/discussions');
        })
        .catch(err => console.log('supression ne fonctionne pas  ' + err))

});

router.get('/commentaires/:_id',isAuthentified, (requete, reponse) => {
    const userLanguage = requete.session.userLanguage || 'fr';
    const user = requete.user;
    const id = requete.params._id;
    Discussions.find({"_id":id}).exec()
    .then(discussion => {
        reponse.render('discussions/commentaires', {
            titrePage: "Forum de discusions",
            user:user,
            liste:discussion,
            'translations': reponse.locals.translations[userLanguage],
        });
    })
});


router.post('/commentaires/ajouter/:_id',isAuthentified, (requete, reponse) => {
    const user = requete.user;
    const nouvelleDate = new Date();
    const date = nouvelleDate.toDateString();
    const id = requete.params._id;
    const auteur= user.nom;
    const courriel= user.email;
    const commentaire=requete.body.commentaire;
    const message={auteur:auteur,date:date,courriel:courriel,commentaire:commentaire}
    let filtre = {"_id": id};
    let options = {$push: {
        commentaires: {
        $each: [ message ]
            }
    }};
    let erreurs=[];
    if ( (typeof commentaire === null || commentaire.trim().length === 0 ) )
    
    {
        erreurs.push({msg:'remplir toute les cases du formulaire!'});

    }
    
    if (erreurs.length > 0) {
        const userLanguage = requete.session.userLanguage || 'fr';
        const user = requete.user;
        Discussions.find({"_id":id}).exec()
        .then(discussion => {
            reponse.render('discussions/commentaires', {
                titrePage: "Forum de discusions",
                user:user,
                errors: erreurs,
                liste:discussion,
                'translations': reponse.locals.translations[userLanguage],
            });
        })
    }
    else{    
       
    Discussions.findOneAndUpdate(filtre, options).exec()
    .then(()=>{
        requete.flash('success_msg', 'Commentaire ajouté avec succes');
        reponse.redirect(`/discussions/commentaires/${id}`);  
    })
   .catch(err => console.log(err));
    }
});

router.get('/commentaire/supprimer/:info',isModerateurAuteurCommentaire,  (requete, reponse, next) => {
   const info = requete.params.info.split(",");
    const id = info.shift();
    const courriel=info.shift();
    const commentaire =info.shift();
    let filtre = {"_id": id};
    Discussions.findOneAndUpdate(filtre,  { $pull: { commentaires: {commentaire}  } }).exec()
        .then(siSupprimé => {
            requete.flash('success_msg', `le commentaire a été supprimé avec succès`);
            reponse.redirect(`/discussions/commentaires/${id}`);
        })
        .catch(err => console.log('supression ne fonctionne pas  ' + err))
});
module.exports =router;