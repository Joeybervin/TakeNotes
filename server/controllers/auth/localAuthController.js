
const passport = require('../../config/passport.config');
const LocalStrategy = require('passport-local').Strategy;
const userModel = require('../../models/user');
const bcrypt = require('bcrypt');
const saltRounds = 15;



passport.use(new LocalStrategy({
    email: 'email',
    password: 'password'
}, async (email, password, done) => {
    try {
        /* search for the use email in the database */
        const user = await userModel.findOne({ email });

        if (!user) {
            return done(null, false, { errorMessage: 'E-mail introuvable. Créez un compte.' });
        }

        /* compare the password (input => database) */
        const isValidPassword = await bcrypt.compare(password, user.passwordHash);

        if (!isValidPassword) {
            return done(null, false, { errorMessage: 'Le mot de passe est incorrecte' });
        }

        /* the user log in */
        return done(null, user);

    } catch (err) {
        return done(err);
    }
}));



// ======> POST connect user with email & password
exports.emailPasswordCallback = async (req, res) => {

}

exports.accountCreation = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const passwordConfirmation = req.body.passwordConfirmation;

    let hash = password === passwordConfirmation ? bcrypt.hashSync(password, saltRounds) : undefined;
    const user = await userModel.findOne({ email });


    const newUser = {
        email: email,
        firstName : 'user123',
        lastName : '',
        password : hash,
        profile_img : 'https://static.vecteezy.com/system/resources/thumbnails/002/534/006/small/social-media-chatting-online-blank-profile-picture-head-and-body-icon-people-standing-icon-grey-background-free-vector.jpg' ,
        token: generateToken({email: email}),
        insert_date : new Date(),
    }

    if (!user && hash !== undefined && email.value.trim() !== '' && password.value.trim() !== '' && passwordConfirmation.value.trim() !== '') {

    }


}
