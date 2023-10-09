const Discussions = require("../models/discussions");
const express = require('express');
const router = express.Router();
const mongoose =require("mongoose");
const discussions = require("../models/discussions");


router.get('/', (requete, reponse) => {
    const user = requete.user;
    Discussions.find({}).sort({date: -1}).exec()
    .then(listeDiscussions => {
        reponse.render('discussions/discussions', {
            titrePage: "Forum de discusions",
            user:user,
            liste:listeDiscussions
        });
    })
});    

router.get('/ajouter', (requete, reponse) => {
    const user = requete.user;
       reponse.render('discussions/ajouter', {
        titrePage: "Ajout d'une discussion",
        user: user
    });
});
router.post('/ajouter',  (requete, reponse, next) => {
const {titre,commentaire}=requete.body;
const user = requete.user;
       
    if ((typeof titre === null || titre.trim().length === 0 ) || (typeof commentaire === null || commentaire.trim().length === 0 ) )
    
    {
        this.erreurs.push({msg:'remplir toute les cases du formulaire!'});

    }else{
        let _id = new mongoose.Types.ObjectId();
        const nouvelleDate = new Date();
        const date = nouvelleDate.toDateString();
        const message =commentaire;
        const auteur=user.nom;
        const nouvellediscussion= new Discussions({_id,titre,auteur,date,message})
        nouvellediscussion.save()
        .then(()=>{
        requete.flash('success_msg','Discussion ajouté avec succes');
        reponse.redirect('/discussions');
        })
        .catch(err=>console.log('insertion dans la BD ne fonctionne pas'+err));
    }


});
router.get('/supprimer/:_id',  (requete, reponse, next) => {
    const id = requete.params._id;

    Discussions.findOneAndDelete({ '_id': id }).exec()
        .then(siSupprimé => {
            requete.flash('success_msg', `La discussion a été supprimé avec succès`);
            reponse.redirect('/discussions');
        })
        .catch(err => console.log('supression ne fonctionne pas  ' + err))
});

router.get('/commentaires/:_id', (requete, reponse) => {
    const user = requete.user;
    const id = requete.params._id;
    Discussions.find({"_id":id}).exec()
    .then(discussion => {
        reponse.render('discussions/commentaires', {
            titrePage: "Forum de discusions",
            user:user,
            liste:discussion
        });
    })
});

router.get('/commentaires/ajouter/:_id', (requete, reponse) => {
    const user = requete.user;
    const _id = requete.params._id;
    reponse.render('discussions/ajouterCommentaire', {
        titrePage: "Ajout d'un commentaire",
        user: user,
        _id
    });
});
router.post('/commentaires/ajouter/:_id', (requete, reponse) => {
    const user = requete.user;
    const nouvelleDate = new Date();
    const date = nouvelleDate.toDateString();
    const id = requete.params._id;
    const commentaire=requete.body.commentaire;
    const message={auteur:user.nom,date:date,commentaire:commentaire}
    let filtre = {"_id": id};
    let options = {$push: {
        commentaires: {
        $each: [ message ]
            }
        }};
       
    Discussions.findOneAndUpdate(filtre, options).exec()
    .then(()=>{
        requete.flash('success_msg', 'Commentaire ajouté avec succes');
        reponse.redirect('/discussions');  
    })
   .catch(err => console.log(err));

});

router.get('/commentaire/supprimer/:info',  (requete, reponse, next) => {
   const info = requete.params.info.split(",");
 
    const id = info.shift();
    const commentaire =info.shift();
    console.log('comm sup',id, commentaire);
    let filtre = {"_id": id};
    Discussions.findOneAndUpdate(filtre,  { $pull: { commentaires: {commentaire}  } }).exec()
        .then(siSupprimé => {
            requete.flash('success_msg', `le commentaire a été supprimé avec succès`);
            reponse.redirect('/discussions');
        })
        .catch(err => console.log('supression ne fonctionne pas  ' + err))
});
module.exports =router;