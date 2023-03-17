
const { pageInfos } = require('../../utils/pageInfos');
const locals = pageInfos('TakesNotes','Free Noje.js Notes App', false)

// ======> GET Homepage
exports.homepage = async (req, res) => {

    const user = req.user || null;

    res.render('pages/home',  {locals : pageInfos('home-page', 'TakesNotes','Free Noje.js Notes App', false, user)} )

}

// ======> GET About
exports.about = async (req, res) => {

    const user = req.user || null;

    res.render('pages/about',  {locals : pageInfos('about-page', 'TakesNotes','Free Noje.js Notes App', false, user)})

}