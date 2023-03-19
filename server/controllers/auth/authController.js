const userModel = require('../../models/user');
const { pageInfos } = require('../../../utils/index')


// ======> RENDER connection page
exports.connection = async (req, res) => {
 
    /* if someone is already connected */
    if (req.user) {
        return res.redirect('/profil')
    }

    /* Get success and error message */
    const errorMessage = req.session.errorMessage;
    const successMessage = req.session.successMessage;

    req.session.errorMessage = null; // delete session errorMessage
    req.session.successMessage = null; // delete session errorMessage

    res.render('pages/connection', {locals : pageInfos("connection-page", 'TakesNotes','Free Noje.js Notes App', false, req.user) ,
    errorMessage : errorMessage || null ,
    successMessage : successMessage || null})

}

// ======> LOGOUT (destroy user session)
exports.logout = (req, res) => {
    req.session.destroy(error => {
        if (error) {
            console.error("logout erreur : " + error);
            res.send({errorMessage : "Une erreur est survenue lors de la déconnection; Veuillez réésayez ultérieurement."})
        }
        else {
            res.redirect('/')
        }
    })
}



