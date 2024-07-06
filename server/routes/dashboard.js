const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');
const { isLoggedIn } = require('../middleware/checkAuth');


// RENDER user dashboard with all his notes
router.get('/', isLoggedIn, dashboardController.dashboard);
// RENDER form to create a new note
router.get('/nouvelle-note', isLoggedIn, (req, res, next) => {
    req.query.role = 'create';
    next();
 }, dashboardController.renderNewNoteForm); 
// RENDER form to create a new note
router.get('/modifier-note', isLoggedIn, (req, res, next) => {
    req.query.role = 'update';
    next();
 }, dashboardController.renderNewNoteForm);
// POST submit a new note
router.post('/submitNewNote', isLoggedIn, dashboardController.submitNewNoteForm );
// POST submit a updated note
router.post('/submitUpdatedNote',isLoggedIn, dashboardController.submitUpdatedNote);
// GET delete a note
router.get('/deleteNote', isLoggedIn, dashboardController.deleteNote);


router.post('/searchNote', isLoggedIn, dashboardController.searchNote);

module.exports = router;