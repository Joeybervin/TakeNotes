const { pageInfos } = require('../../utils/pageInfos')
const userModel = require('../models/user');


// --> GET user profil and the infos
exports.profile = async (req, res) => {


    
    res.render('pages/profile', {locals : pageInfos('profile-page', 'TakesNotes','Free Noje.js Notes App', false, req.user)} )

}

// --> POST update user profile infos
exports.profileUpdate = async (req, res) => {

    // TODO

};