const userModel = require('../../models/user');
const { pageInfos } = require('../../../utils/pageInfos')
const locals = pageInfos('TakesNotes','Free Noje.js Notes App', false)


// ======> RENDER connection page
exports.connection = async (req, res) => {
    
    res.render('pages/connection', {locals , errorMessage : null})

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



