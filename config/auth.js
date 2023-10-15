// config /authentifications
// Date: 24 aout 2023
// Fournier Allan
const mongoose =require("mongoose");
const Discussions = require("../models/discussions");



module.exports = {
    //required to be authentified autrement incapacité a access pages
    isAuthentified: function(req, rep, next) {
        if (req.isAuthenticated()) {
            return next();
        }
        req.flash('error_msg', 'Vous êtes un plébéien, authentifiez-vous pour accéder au site.');
        rep.redirect('/')
    },
    //if admin = privilege see hiden pages
    isAdmin: function(req, rep, next){
        if (req.isAuthenticated()){
            //si il est authentifier => verification du roles admin
            let admin = req.user.roles.includes('admin');
            if (admin) {
                return next();
            } else {
                req.flash("error_msg", "Vous devez être 'admin' pour acceder a cette page");
                rep.redirect('/menu');
            }            
        } else {        
        req.flash("error_msg", "Connectez-vous pour acceder au site");
        rep.redirect('/'); 
    }},


    isModerateurAuteurCommentaire: function(req, rep, next){
        if (req.isAuthenticated()){
        
            const moderateur = req.user.roles.includes('moderateur');
            const auteur = isAuteurCommentaire(req,rep);
            if (moderateur||auteur) {
                return next();
            } else {
                req.flash("error_msg", "Vous devez être 'moderateur' pour acceder a cette page");
                rep.redirect('/menu');
            }            
        } else {        
        req.flash("error_msg", "Connectez-vous pour acceder au site");
        rep.redirect('/'); 
}},
    isModerateurAuteurDiscussion: function(req, rep, next){
    if (req.isAuthenticated()){
        user=req.user 
        const moderateur = req.user.roles.includes('moderateur');
        if (moderateur) {
            return next();
        } else {
            const courriel=user.email
            const id = req.params._id;
            Discussions.findOne({"_id":id}).exec()
            .then(discussion=>{
                if(courriel===discussion.courriel){
                    return next();
                } else {
                    req.flash("error_msg", "Vous devez être 'moderateur' pour acceder a cette page");
                    rep.redirect('/menu');
                } 
            }); 
           
        }            
    } else {        
    req.flash("error_msg", "Connectez-vous pour acceder au site");
    rep.redirect('/'); 
}},

}

isAuteurCommentaire=(req, rep, next)=>{
    const user= req.user;
   
        const courrielUser=user.email;
        const info = req.params.info.split(",");
        const id = info.shift();
        const courrielAuteur=info.shift();
        console.log('isComm', courrielAuteur, courrielUser);
        
            if(courrielUser===courrielAuteur){
                return true;
            } else {
                return false;
            }
 

}