// config /passport
// Date: 24 aout 2023
// Fournier Allan

const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

const Usagers = require("../models/Usagers");

module.exports = function(passport) {
    passport.use(
        new LocalStrategy({usernameField: 'email'}, (email, password, done)=>{
            // recherche dans la BD...
            Usagers.findOne({'email': email})
            .then((user) => {
                if (!user) {
                    return done(null, false, { message: 'Cet email n\'existe pas'});
                }
                // j'ai un usager -> now verification mdp
                // on doit hacher le pwd avant de le comparer
                bcrypt.compare(password, user.password, (err, match)=>{
                    if (err) throw err;
                    if (match) {
                        return done(null, user);
                    }  else {
                        return done(null, false, {message: 'mdp wrong'});
                    }
                });
            })
        })
    );
    passport.serializeUser(
        function(user, done) {
        done(null, user.email)
        }
    );
    passport.deserializeUser(
        function(email, done) {
        Usagers.findOne({email : email})
        .then(user => done(false, user))
        .catch(err =>done(err, false));
        }
    );
};
