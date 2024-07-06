
const passport = require('../../config/passport.config');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../../models/user');
const { generateToken, generateRandomValue } = require('../../../utils/index')
const bcrypt = require('bcrypt');
const saltRounds = Number(process.env.SALT_ROUNDS);



passport.use(new LocalStrategy( {
        username: 'email',
        password: 'password',
        passReqToCallback: true,
    }
    , 
    async function (req, email, password, done)  {
        try {
            /* search for the use email in the database */
            const user = await User.findOne({ email });

            /* req.body.signInEmailInput && signPasswordInput */
            if (!user) {
                req.session.errorMessage = "L'e-mail est incorrect. Réessayer ou bien créer un compte utilisateur.";
                return done(null, false);
            }
            /* compare the password (input => database) */
            const isValidPassword = await bcrypt.compare(password, user.password);
            
            if (!isValidPassword) {
                req.session.errorMessage = "Le mot de passe est incorrect."
                return done(null, false);
            }

            /* the user log in */
            done(null, user);

        }
        catch (err) {
            console.log(err)
            req.session.errorMessage = "Désolé, une erreur est survenue sur notre serveur. Réessayez de vous connecter."
            return done(null, false);
        }

}));


// --> GET local connection page callback
exports.authLocalCallback = 
    passport.authenticate('local', { 
        failureRedirect: '/connexion',
        successRedirect : '/tableau-de-bord',
    })
;

// POST create a new account
exports.accountCreation = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const passwordConfirmation = req.body.passwordConfirmation;

    
    try {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*._?\-&])[A-Za-z\d@$!%*._?\-&#]{8,25}$/


        if (email.trim() === '' || password.trim() === '' || passwordConfirmation.trim() === '') {
            req.session.errorMessage = "Tous les champs sont obligatoires."
            return res.redirect('/connexion');
        }
    
        const user = await User.findOne({ email }); // search for the user in the database

        if (user) {
            req.session.errorMessage = "L'adresse e-mail existe déjà"
            return res.redirect('/connexion');
        }

        const securePassword = password.match(passwordRegex)

        if (!securePassword) {
            req.session.errorMessage = "Le mot de passe est invalide !"
            return res.redirect('/connexion');
        }
    
        const passwordMatch = password === passwordConfirmation // Compare the passwords

        if (!passwordMatch) {
            req.session.errorMessage = "Les mots de passe ne sont pas identiques"
            return res.redirect('/connexion');
        }

        const hash = bcrypt.hashSync(password, saltRounds); // hash the password
        
        const newUser = {
            email: email,
            firstName : 'user123',
            lastName : '',
            password : hash,
            profile_img : 'https://res.cloudinary.com/joeybervin/image/upload/v1679247539/TakeNotes-default-profile-img.jpg',
            token: generateToken(email),
            insert_date : new Date(),
            authentification_method : 'local',
        }
    
        let userSaved = await User.create(newUser)
    
        if (!userSaved) {
            req.session.errorMessage = "Désolé, une erreur est survenue sur notre serveur. Réessayez de vous connecter.";
            return res.redirect('/connexion');
        }

        req.session.successMessage = "Votre compte à bien été créé";
        return res.redirect('/connexion');
        
    } catch (error) {
        console.log("SIGN-UP ERROR : ", error);
        req.session.errorMessage =  "Désolé, une erreur est survenue sur notre serveur. Réessayez de vous connecter.";
        return res.redirect('/connexion')
        
    }

}
