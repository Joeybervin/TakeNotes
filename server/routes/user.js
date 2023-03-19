const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { isLoggedIn } = require('../middleware/checkAuth');

// ======> GET user profile
router.get('/', isLoggedIn,  userController.profile);

// ======> POST update user profile
router.post('/update', isLoggedIn,  userController.profileUpdate);

module.exports = router;