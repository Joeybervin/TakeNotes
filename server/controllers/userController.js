const { upload } = require('../config/index');
const { inputValidation, pageInfos, deleteTmpFile, whiteSpace } = require('../../utils/index');
const bcrypt = require('bcrypt');
const saltRounds = Number(process.env.SALT_ROUNDS);
const User = require('../models/user');



// --> GET user profile and the infos
exports.profile = async (req, res) => {
    res.render('pages/profile', { locals: pageInfos('profile-page', 'TakeNotes', 'Free Noje.js Notes App', false, req.user),
    errorMessage: req.query.errorMessage || null,
    successMessage: req.query.successMessage || null})
}

// --> POST update user profile infos
exports.profileUpdate = async (req, res, next) => {
    const field = req.body.action; // to know which form was sent

    /* form input */
    const file = req.files;

    /* Request status message */
    let errorMessage = '';
    let successMessage = '';

    /* new user infos to save */
    let uploadedImageUrl = ''; // url of the user uploaded profile image
    let newPassword = '';
    let validPasswordForm = false ;
    let validForm = false ;


    if (file && field !== "profilePassword") {
        const imageTempFolderPath = `public/tmp/${file.profile_img.name}`;
        try {
            file.profile_img.mv(imageTempFolderPath, function (err) {
                if (err) {
                    console.log("image upload erreur : ", err)
                    return errorMessage = 'Nous avons malheureusement rencontré une erreur. Veuillez réessayer dans quelques instants.';
                }
            });
            const result = await upload(req.user.public_id, imageTempFolderPath);
            if (result) uploadedImageUrl = result.secure_url;
        } catch (err) {
            console.log("Erreur Cloudinary : ", err);
            errorMessage = 'Nous avons malheureusement rencontré une erreur. Veuillez réessayer dans quelques instants.';
        }
    }
    if (req.body.password && req.body.newPassword && req.body.newPasswordConfirmation && field !== "profileImage") {
        
        if (req.body.password.trim() === '' || req.body.newPassword.trim() === '' || req.body.newPasswordConfirmation.trim() === '') {
            return res.redirect(`/profil?errorMessage=Tous les champs sont obligatoires ! `);
        } // if empty input

        if ( whiteSpace(req.body.newPassword) || whiteSpace(req.body.newPasswordConfirmation)) {
            return res.redirect(`/profil?errorMessage=Les espaces sont interdits `);
        } // if whitespace in new password
        
        const user = await User.findOne({ email : req.user.email}); 

        /* compare the old password with the one in the database */
        const oldPasswordMatch = await bcrypt.compare(req.body.password, user.password);

        if (!oldPasswordMatch) {
            return res.redirect(`/profil?errorMessage=Ancien mot de passe incorrect.`);
        }
        
        if (req.body.newPassword !== req.body.newPasswordConfirmation ) {
            return res.redirect(`/profil?errorMessage=Les deux nouveaux mots de passe ne correspondent pas.`);
        }

        newPassword = await bcrypt.hash(req.body.newPassword, saltRounds); // hash the  new password

        validPasswordForm = true;
    }


    /* user only want to change his profile image */
    if (field === "profileImage") {

        if (!file || Object.keys(file).length === 0) {
            errorMessage = 'Aucune image n\'a été envoyé';
        }
        else {
            // update the data in the database
            try {
                const response = await User.updateOne(
                    { email: req.user.email },
                    { $set: { profile_img : uploadedImageUrl } }
                );
                if (response.modifiedCount === 1){ 
                    successMessage = "Votre image à bien été modifié";
                }
            } catch (err) {
                console.log(err);
                errorMessage = "Votre image n'a pas pu être modifiée. Réessayez dans quelques instants.";
            }

            // delete the image from the tmp folder
            deleteTmpFile(`public/tmp/${file.profile_img.name}`)

        }

    }
    // user only wana change his password
    else if (field === "profilePassword") {

        if (!req.body.password && !req.body.newPassword && !req.body.newPasswordConfirmation ) {
            return res.redirect(`/profil?errorMessage=Tous les champs sont obligatoires ! `);
        }

        if (!validPasswordForm) {
            return res.redirect(`/profil?errorMessage=Le formulaires doit être valide pour tous changements. `);
        }

        try {
            const response = await User.updateOne(
                { email: req.user.email },
                { $set: { password : newPassword } }
            );
            if (response.modifiedCount === 1){ 
                successMessage = "Votre mot de passe à bien été modifié.";
            }
        } catch (err) {
            console.log("END password update error : ", err);
            errorMessage = "Votre mot de passe n'a pas pu être modifiée. Réessayez dans quelques instants.";
        }

    }
    // user wanna change multiple fields
    else {

        /* Check on the validity of the password form sent */
        let paswordFielCount = 0 ;
        const passportFormFields = ['password', 'newPassword', 'newPasswordConfirmation'];

        for (const field of passportFormFields ) {
            if (req.body[field] !== "") paswordFielCount += 1
        }

        if (paswordFielCount === 0) validPasswordForm = true ;

        if (!validPasswordForm || paswordFielCount >= 1 && paswordFielCount < 3) {
            return res.redirect(`/profil?errorMessage=Champs mots de passe invalides. `);
        }

        const databaseUser = await User.findOne({email : req.user.email})

        if  (uploadedImageUrl) {
            console.log(uploadedImageUrl)
            validForm = validForm && inputValidation(uploadedImageUrl, req.user.profile_img, false)
        }

        // Loop through the keys and values of the request body
        for (let [key, value] of Object.entries(req.body)) {
            if ( key !== "action" && key !== "password" && key !== "newPasswordConfirmation") {
                if (key === "newPassword"){ 
                    key = "password"
                    value = newPassword || value
                }
                console.log(`START ==> key: ${key} - value:${value} | ${validForm}`)
                if (key === "password") {
                    validForm = inputValidation(value, databaseUser[key], true )
                }
                else {
                    validForm = inputValidation(value, databaseUser[key], false)
                }
                console.log(`END ==> key: ${key} - value:${value} | ${validForm}`)
                if (validForm === false) break
            }
        }

        if (!validForm) errorMessage = "Invalide"

        /* save change in the database if pass all validation */
        try {
            if (validForm) {
                const response = await User.updateOne(
                    { email: req.user.email },
                    { $set: { 
                        firstName : req.body.firstName || req.user.firstName,
                        lastName : req.body.lastName || req.user.lastName,
                        email : req.body.email || req.user.email,
                        password : newPassword || req.user.password,
                        profile_img: uploadedImageUrl || req.user.profile_img
                    } }
                );
                if (response.modifiedCount === 1){ 
                    console.log('JE SUIS DANS LA REPONSE DE MONGOOSE ')
                    successMessage = "Les champs ont bien été modifiés"
                }
            }
        } catch (error) {
            errorMessage = "Problème rencontré lors de la validation de votre formulaire. Les modifications n'ont pas pu être effctuté"
        }
            
        // delete the image from the tmp folder
        if (file) deleteTmpFile(`public/tmp/${file.profile_img.name}`)

    }

    res.redirect(`/profil?successMessage=${successMessage}&errorMessage=${errorMessage}`);

};