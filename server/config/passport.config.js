
const passport = require('passport');
const User = require('../models/user');


// Persist user data in the session after succesful authentification
passport.serializeUser(function(user, done) {
    //console.log('SERIALIZATION SUCCESSFUL' + user );
    done(null, user.id);
})

// Retrieve user data from dtabase using session ID
passport.deserializeUser(async function(id, done) {
    try {
        const user = await User.findOne({_id: id});
        const filteredUser = {
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            profile_img: user.profile_img,
            token: user.token,
        }
        //console.log('DESERIALIZATION SUCCESSFUL', user);
        done(null, filteredUser);
    } catch (error) {
        done(error, null);
    }
});

module.exports = passport;