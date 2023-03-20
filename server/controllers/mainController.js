
const { pageInfos } = require('../../utils/index');

// ======> GET Homepage
exports.homepage = async (req, res) => {

    const user = req.user || null;

    res.render('pages/home',  {locals : pageInfos('home-page', 'TakeNotes','Free Noje.js Notes App', false, user)} )

}

// ======> GET About
exports.about = async (req, res) => {

    const user = req.user || null;

    res.render('pages/about',  {locals : pageInfos('about-page', 'TakeNotes','Free Noje.js Notes App', false, user)})

}