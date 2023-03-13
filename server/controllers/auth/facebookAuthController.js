const passport = require('../../config/passport.config');
const FacebookStrategy = require('passport-facebook').Strategy;
const User = require('../../models/user');
const { generateToken }  = require('../../../utils/jw.util');

/* FACEBOOK STRATEGY */
passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: process.env.FACEBOOK_CALLBACK_URL,
    profileFields: ['id', 'picture', 'email', 'first_name', 'last_name']
},
    async function(accessToken, refreshToken, facebookProfile, done) {
        console.log(facebookProfile)
     /*    const newUser = {
            email: facebookProfile.emails[0].value,
            firstName : facebookProfile.name.givenName,
            lastName : facebookProfile.name.familyName,
            profile_img : facebookProfile.photos[0].value,
            token: generateToken({firstName: facebookProfile.name.givenName, lastName : facebookProfile.name.familyName }),
            facebook_id: facebookProfile.id,
            insert_date : new Date(),
        }
        try {
            let user = User.findOne({ email: faebook.email })
            if (user) {
                done(null, user);
            }
            else {
                user = await User.create(newUser)
                done(null, user);
            }
        } 
        catch (error) {
            console.log('error')
        } */
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
    

