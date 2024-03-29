const User = require('../../models/user');
const { generateToken, generateRandomValue }  = require('../../../utils/index');
const passport = require('../../config/passport.config');
const GoogleStrategy = require('passport-google-oauth20').Strategy;


/* GOOGLE STRATEGY */
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL
},
    async function (accessToken, refreshToken, googleProfile, done) {
        const newUser = {
            email: googleProfile.emails[0].value,
            firstName : googleProfile.name.givenName,
            lastName : googleProfile.name.familyName,
            profile_img : googleProfile.photos[0].value,
            token: generateToken(googleProfile.emails[0].value),
            google_id: googleProfile.id,
            insert_date : new Date(),
            authentification_method : 'google',
            public_id : generateRandomValue(20),
        }
        try {
            let user = await User.findOne({email: googleProfile.emails[0].value});
            if (user) {
                done(null, user);
            }
            else {
                user = await User.create(newUser);
                done(null, user);
            }
        } 
        catch (error) {
            done(error);
            /* req.session.errorMessage = "Une erreur est apparue lors de la connexion avec Facebook."
            res.redirect('/connexion') */
        }
    }
));

// --> GET GOOGLE connection page
exports.authGoogle = passport.authenticate('google', { scope: ['email', 'profile'] });

// --> GET google connection page callback
exports.authGoogleCallback = 
    passport.authenticate('google', { 
        failureRedirect: '/connexion',
        successRedirect : '/tableau-de-bord',
    })
;

