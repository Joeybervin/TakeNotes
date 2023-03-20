const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');
const { isLoggedIn } = require('../middleware/checkAuth');


// RENDER user dashboard with all his notes
router.get('/', isLoggedIn, dashboardController.dashboard);
// RENDER form to create a new note
router.get('/nouvelle-note', isLoggedIn, dashboardController.createNewNote); 
// POST submit a new note
router.post('/addANewNote', isLoggedIn, dashboardController.addANewNote );
// POST submit a updated note
router.post('/updateNote',isLoggedIn, dashboardController.updateNote);
// GET delete a note
router.get('/deleteNote', isLoggedIn, dashboardController.deleteNote);


router.post('/searchNote', isLoggedIn, dashboardController.searchNote);

module.exports = router;