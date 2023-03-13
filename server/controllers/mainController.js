
const { pageInfos } = require('../../utils/pageInfos');
const locals = pageInfos('TakesNotes','Free Noje.js Notes App', false)

// ======> GET Homepage
exports.homepage = async (req, res) => {

    console.log(locals)
    
    locals.user = req.user;
    res.render('pages/home',  locals )

}

// ======> GET About
exports.about = async (req, res) => {


    locals.user = req.user;
    res.render('pages/about',  locals)

}