require('dotenv').config();
const express = require('express');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
const session = require('express-session');
const passport = require('passport');
const MongoStore = require('connect-mongo');
const fileUpload = require('express-fileupload');

const app = express();
// port number used
const port = 5000 || process.env.PORT;

// image upload 
app.use(fileUpload({
  useTempFiles : true,
  safeFileNames: true,
  preserveExtension: 0,
  tempFileDir: `${__dirname}/public/tmp`
}));

// Initializing the generic session middleware
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  errorMessage : null,
  successMessage: null,
  cookie: {
    sameSite: 'strict',
    httpOnly: true,
    maxAge: 7 * 24 * 60 * 60 * 1000, // life cycle 1 week
  },
  store: MongoStore.create({
    mongoUrl : process.env.MONGODB_URI
  }),
}));

// Initialize Passport
//passportconfig(passport);
app.use(passport.initialize());
app.use(passport.session());

app.use(express.urlencoded({extended: true}));
app.use(express.json());

/* DATABASE connection */
require('./server/config/connectDB.config');

// Static Files
app.use(express.static(path.join(__dirname, 'public')));

// Templating Engine
app.use(expressLayouts);
app.set('layout', './index');
app.set('view engine', 'ejs');

// errors
app.use((err, req, res, next) => {
  // headers error (sent 2 times)
  if (res.headersSent) {
    return next(err);
  }

  console.log(err)
  res.status(500).render('pasges/error', { errorCode: 500, errorMessage: 'Une erreur est survenue, Essayez de ré-ouvrir l\'application' })
})
// Routes
app.use('/', require('./server/routes/index'));
app.use('/connexion', require('./server/routes/auth'));
app.use('/tableau-de-bord', require('./server/routes/dashboard'));
app.use('/profil', require('./server/routes/user'));

// Handle 404 eror
app.get('*', function(req, res) {
    //res.status(404).send('404 Page Not Found.')
    res.status(404).render('pages/error', { errorCode: 404, errorMessage: 'Désolé, cette page n\'existe pas.' });
  })


app.listen(port,  () => {
    console.log(`App listening on port ${port}`)
})