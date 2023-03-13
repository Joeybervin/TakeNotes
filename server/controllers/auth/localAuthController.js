
const passport = require('passport');
const jwt = require('jsonwebtoken');
const LocalStrategy = require('passport-local').Strategy;
const userModel = require('../../models/user');



passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, async (email, password, done) => {
    try {
        const user = await userModel.findOne({ email });

        if (!user) {
            return done(null, false, { message: 'Incorrect email.' });
        }

        const isValidPassword = await user.checkPassword(password);

        if (!isValidPassword) {
            return done(null, false, { message: 'Incorrect password.' });
        }

        return done(null, user);
    } catch (err) {
        return done(err);
    }
}));



// ======> POST connect user with email & password
exports.emailPasswordCallback = async (req, res) => {

}

