const { pageInfos } = require('../../utils/pageInfos');
const locals = pageInfos('TakesNotes','Free Noje.js Notes App', true)

// require('../config/passport.config');


// ======> GET Dashboard
exports.dashboard = async (req, res) => {

    locals.user = req.user;
    res.render('pages/dashboard/dashboard', locals)

}