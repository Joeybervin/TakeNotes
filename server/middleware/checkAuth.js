exports.isLoggedIn = function(req, res,next) {
    if (req.user) {
        next();
    }
    else {
        console.log("MIDDLEWARE REQ.USER : " + req.user)
        return res.status(401).render('pages/error', {errorCode : 401, errorMessage : 'Accès refusé ! Connectez-vous afin d\'avoir accès à cette page'})
    }
}