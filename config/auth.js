// config /authentifications
// Date: 24 aout 2023
// Fournier Allan

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
    // if gestionnaire peux access page liste usagers
    isGestion: function(req, rep, next){
        if (req.isAuthenticated()){
            //si il est authentifier => verification du roles admin
            let gestion = req.user.roles.includes('gestion');
            if (gestion) {
                return next();
            } else {
                req.flash("error_msg", "Vous devez être 'gestionnaire' pour acceder a cette page");
                rep.redirect('/menu');
            }            
        } else {        
        req.flash("error_msg", "Connectez-vous pour acceder au site");
        rep.redirect('/'); 
    }}
}