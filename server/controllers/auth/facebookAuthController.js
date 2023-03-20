const passport = require('../../config/passport.config');
const { generateToken, generateRandomValue }  = require('../../../utils/index');
const User = require('../../models/user');
const FacebookStrategy = require('passport-facebook').Strategy;



/* FACEBOOK STRATEGY */
passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: process.env.FACEBOOK_CALLBACK_URL,
    profileFields: ['id', 'picture', 'email', 'first_name', 'last_name']
},
    async function(accessToken, refreshToken, facebookProfile, done) {
        console.log(facebookProfile)
        const newUser = {
            email: facebookProfile.emails[0].value,
            firstName : facebookProfile.name.givenName,
            lastName : facebookProfile.name.familyName,
            profile_img : facebookProfile.photos[0].value,
            token: generateToken(facebookProfile.emails[0].value),
            facebook_id: facebookProfile.id,
            insert_date : new Date(),
            authentification_method : 'facebook',
            public_id : generateRandomValue(20),
        }
        try {
            let user = await User.findOne({ email: facebookProfile.emails[0].value })
            if (user) {
                done(null, user);
            }
            else {
                user = await User.create(newUser)
                done(null, user);
                
            }
        } 
        catch (error) {
            req.session.errorMessage = "Une erreur est apparue lors de la connexion avec Facebook."
            res.redirect('/connexion')
        }
    }
));

// --> GET FACEBOOK connection page
exports.authFacebook = passport.authenticate('facebook');

// --> GET FACEBOOK connection callback page
exports.authFacebookCallback =
    passport.authenticate('facebook', { 
        failureRedirect: '/connexion',
        successRedirect : '/tableau-de-bord',
    });
    

