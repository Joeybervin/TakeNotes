// ======> GET Homepage

exports.homepage = async (req, res) => {

    const locals = {
        title: 'TakesNotes',
        description : 'Free Noje.js Notes App'
    }

    res.render('index', locals)

}

// ======> GET About

exports.about = async (req, res) => {

    const locals = {
        title: 'About - TakesNotes',
        description : 'Free Noje.js Notes App'
    }

    res.render('about', locals)

}