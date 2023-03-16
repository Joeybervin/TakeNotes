const { pageInfos } = require('../../utils/pageInfos');
const noteModel = require('../models/note');

// ======> GET Dashboard
exports.dashboard = async (req, res) => {
    
   
    
    res.render('pages/dashboard/dashboard', {locals : pageInfos('dashboard-page', 'TakesNotes','Free Noje.js Notes App', true, req.user)})

}