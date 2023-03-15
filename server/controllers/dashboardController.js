const { pageInfos } = require('../../utils/pageInfos');

// require('../config/passport.config');


// ======> GET Dashboard
exports.dashboard = async (req, res) => {
    
   
    
    res.render('pages/dashboard/dashboard', {locals : pageInfos('dashboard-page', 'TakesNotes','Free Noje.js Notes App', true, req.user)})

}