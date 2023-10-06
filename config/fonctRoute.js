const bcryptjs= require('bcryptjs');
const mongoose = require('mongoose');
const nodeJSpath=require('path');
const fs=require('fs').promises;

const Mots = require('../models/Mots');



renvoiFormMotIncomplet=(traducteur,reponse)=>{
    
    const {nomVariable,francais,anglais}=traducteur;
    reponse.render('ajoutMots', {
        'titrePage':"Ajout de mot",
        errors:fonctRoute.erreurs,
        nomVariable,
        francais,
        anglais
    });
    fonctRoute.erreurs=[];
    
}

class fonctRoute{

static erreurs=[];


static verifMot = (requete,reponse)=>{    
    console.log('a');

    const {nomVariable,francais,anglais}=requete.body;
    if(!nomVariable || !anglais || !francais ){
        this.erreurs.push({msg:'remplir toute les cases du formulaire!'});
        };
        console.log('b');
        Mots.findOne({'nomVariable':nomVariable})
        .then(nomVariableExiste=>{
            console.log('c');
         if (nomVariableExiste){ // vérif si isbn existe deja present dans la BD
         this.erreurs.push({msg:'le nom de variable est deja present dans la base de donnee'});
         console.log('d');
         this.erreurs.length > 0 ? renvoiFormMotIncomplet(requete.body,reponse)  : this.ajoutMotBD1(requete,reponse); 
        }else{
        this.erreurs.length > 0 ? renvoiFormMotIncomplet(requete.body,reponse)  : this.ajoutMotBD1(requete,reponse); 
        }
     });
}
          
static ajoutMotBD1 = (requete,reponse)=>{
    const {nomVariable,francais,anglais}=requete.body;
    let _id = new mongoose.Types.ObjectId();
    console.log('1');
    const nouveauMot= new Mots({_id,nomVariable,francais,anglais});
    console.log('2');
    nouveauMot.save();
    console.log('3');
    requete.flash('success_msg','Mot ajouter avec succes 2');
    reponse.redirect('/menu');
   
    
          
}

                  
       
}
                       
module.exports = { fonctRoute };


