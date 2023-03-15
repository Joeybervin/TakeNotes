const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth/authController');
const localAuthController = require('../controllers/auth/localAuthController');
const googleAuthController = require('../controllers/auth/googleAuthController');
const facebookAuthController = require('../controllers/auth/facebookAuthController');

/* ============== RENDER CONNECTION PAGE (connection methods) ============== */

router.get('/', authController.connection);

/* ============== CONNECTION METHODS ============== */

/* EMAIL & PASSWORD */
router.post('/local/callback', localAuthController.authLocalCallback);
router.post('/nouveau-membre', localAuthController.accountCreation);

/* GOOGLE */
router.get('/auth/google', googleAuthController.authGoogle);
router.get('/google/callback', googleAuthController.authGoogleCallback);

/* FACEBOOK */
router.get('/auth/facebook', facebookAuthController.authFacebook);
router.get('/facebook/callback', facebookAuthController.authFacebookCallback);


/* ============== LOG OUT METHODS ============== */

router.post('/logout', authController.logout)

module.exports = router;