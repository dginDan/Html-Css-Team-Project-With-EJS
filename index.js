// Master page - configuration pour le bon fonctionnement de mon site web
// Date: 24 aout 2023
// Fournier Allan

const express = require("express");
const app = express();
const mongoose =require("mongoose");
const expressLayouts = require("express-ejs-layouts");
const passport = require("passport");
const flash = require("connect-flash");
const session = require("express-session");
const multer = require("multer");
const upload = multer({dest:'./uploads'});
const enTranslations = require('./locales/en.json');
const frTranslations = require('./locales/fr.json');


const storage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, './uploads');
    },
    filename: function(req, file, callback) {
        callback(null, file.fieldname);
    },
});


app.use(upload.any()); // plusieurs televersement images (fonctonne le mieux, autres merdique/bug) (retourne tableau)

//configuration de passeport
require('./config/passport')(passport);


const PORT = process.env.PORT || 8000;

mongoose.set('strictQuery', false); // eviter une erreur lors de npm run dev
mongoose.connect('mongodb+srv://pficegep:pfi12345678!@cluster0.vrxbwhl.mongodb.net/pfi');
const db = mongoose.connection;
db.on('error', (err) => {
    console.error('Un problème est survenu, voici l\'erreur :', err);
});
db.once('open', () => {
    console.log('Connexion à la dataBase réussi !');
});  

// configuration de Express et des intergiciels
app.use(expressLayouts);

app.use('/assets', express.static('./static/assets'));
app.use('/css', express.static('./static/css'));
app.use('/js', express.static('./static/js'));
app.use('/images', express.static('./static/images'));

// Express body parser (interpreteur Express sur le form reçu en POST)
app.use(express.urlencoded({extended: true}));

// configuration de la session Express (variables de session)
app.use(
    session({secret: 'un mot secret', resave: true, saveUninitialized: true})
);

// configuration middleware (intergiciel) Passport
app.use(passport.initialize());
app.use(passport.session());
//middleware connect flash
app.use(flash());

// variables globals pour envoyer à Passport et aux autres librairies
app.use(
    function(requete, reponse, next) {
        reponse.locals.success_msg = requete.flash('success_msg');
        reponse.locals.error_msg = requete.flash('error_msg');
        reponse.locals.error = requete.flash('error');
        next();
    }
);
//middleware pour translation
app.use((req, res, next) => {
    res.locals.translations = {
      en: enTranslations,
      fr: frTranslations,
    };
    next();
  });

app.use('/items', require('./routes/items'));
app.use (require('./routes/usagers'));
app.use('/discussions', require('./routes/discussions'));

app.use('/', require('./routes/index'));

app.set('views', './views');
app.set('view engine', 'ejs');

app.listen( PORT,  console.log(`Serveur démarré sur le port ${PORT} `));

