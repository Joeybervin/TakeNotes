const { pageInfos } = require('../../utils/pageInfos')
const userModel = require('../models/user');

const locals = pageInfos('TakesNotes','Free Noje.js Notes App', false)


// --> GET user profil and the infos
exports.profile = async (req, res) => {


    locals.user = req.user;
    res.render('pages/profile', locals )

}

// --> POST update user profile infos
exports.profileUpdate = async (req, res) => {

    // TODO

}