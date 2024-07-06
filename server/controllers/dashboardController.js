const User = require('../models/user');
const { timeSinceLastUpdate, generateRandomValue, pageInfos } = require('../../utils/index');



// ======> RENDER dashboard with user notes
exports.dashboard = async (req, res) => {

    const searchString = req.query.search;
    const regex = searchString ? new RegExp(searchString, 'i') : /^.*/;

    /* Pagination */
    const notesPerPage = 12; // number of notes per page
    const page = req.query.page || 1; // current page
    const skip = (notesPerPage * page) - notesPerPage; // the 12 notes to render
    const userNotesCountPromise = await User.findOne({ email: req.user.email }); // number : notes array length
    const totalPages = Math.ceil(userNotesCountPromise['notes'].length / notesPerPage); // number : number of pages

    try {
        const sortedNotes = await User.aggregate([
            { $match: { email: req.user.email } },
            { $unwind: "$notes" },
            { $sort: { "notes.last_updated": -1, } },
            {
                $project: {
                    token: "$notes.token",
                    title: {
                        $substr: ["$notes.title", 0, 30],
                    },
                    content: {
                        $substr: ["$notes.content", 0, 100]
                    },
                    last_updated: "$notes.last_updated",
                }
            },
            {
                $match: {
                    $or: [
                        { "title": { $regex: regex } },
                        { "content": { $regex: regex } }
                    ]
                }
            },
            { $skip: skip },
            { $limit: notesPerPage }
        ]);

        // Dynamic update dates
        sortedNotes.map(function (note) {
            note.last_updated = timeSinceLastUpdate(note.last_updated);
            return note;
        });

        res.render('pages/dashboard/dashboard', {
            locals: pageInfos('dashboard-page', 'TakeNotes', 'Free Noje.js Notes App', true, req.user),
            notes: sortedNotes,
            currentPage: page,
            totalPages: totalPages,
            searchString : searchString || null
        })

    } catch (error) {
        console.log(error)
    }

}

// ======> RENDER form to create a new note or update one
exports.renderNewNoteForm = async (req, res) => {

    const noteToken = req.query.token
    const action = req.query.role
    let noteToUpdate;

    if (action === 'update') {
        const result = await User.findOne({ email: req.user.email },
            {
                notes: {
                $elemMatch: {
                        token: noteToken
                    }
                },
                _id : 0
            })


        noteToUpdate = result.notes[0]
    }
    

    res.render('pages/dashboard/createNewNote', {
        locals: pageInfos('createNote-page', 'TakeNotes - nouvelle note', '', false, req.user),
        role: action,
        errorMessage: req.query.errorMessage || null,
        noteToken: noteToken,
        savedContent: action === "update" ? noteToUpdate.content : ""  , 
        savedTitle:  action === "update" ? noteToUpdate.title : ""
    })
}

// ======> POST create a new note with the form and save it in the database
exports.submitNewNoteForm = async (req, res) => {

    const newNote = {
        token: generateRandomValue(15),
        title: req.body.noteTitle,
        content: req.body.noteContent,
        create_at: new Date(),
        last_updated: new Date(),
    };

    try {

        const noteListUpdate = await User.updateOne({ email: req.user.email },
            {
                $addToSet: {
                    notes: newNote
                }
            })

        if (noteListUpdate.modifiedCount === 1) {

            res.redirect('/tableau-de-bord')
        }
        else {
            console.log("error")
            // if any error occur the user doesn't lose what he already wrote
            res.redirect(`/tableau-de-bord/nouvelle-note?savedTitle=${req.body.noteTitle}&savedContent=${req.body.noteContent}&errorMessage="Erreur ! Votre note n\'a pas pu être enregistré réessayez."`)
        }

    } catch (error) {
        console.log(error);
        // if any error occur the user doesn't lose what he already wrote
        res.redirect(`/tableau-de-bord/nouvelle-note?savedTitle=${req.body.noteTitle}&savedContent=${req.body.noteContent}&errorMessage="Erreur ! Votre note n\'a pas pu être enregistré réessayez."`)
    }

}

// GET delete a note
exports.deleteNote = async (req, res) => {

    const noteToken = req.query.token

    const update = await User.updateOne({ email: req.user.email },
        {
            $pull: {
                notes: {
                    token: noteToken
                }
            }
        })

    if (update === 1) {
        res.redirect('/tableau-de-bord');
    }
    else {
        res.redirect('/tableau-de-bord');
    }
}

exports.submitUpdatedNote = async (req, res) => {
    console.log(req.query.token)

    try {

        const noteListUpdate = await User.updateOne(

            

            { email: req.user.email, "notes.token": req.query.token },
            {
                $set: {
                    "notes.$.title": req.body.noteTitle,
                    "notes.$.content": req.body.noteContent,
                    "notes.$.last_updated": new Date()
                }

            })

        if (noteListUpdate.modifiedCount === 1) {

            res.redirect('/tableau-de-bord')
        }
        else {
            console.log("error")
            // if any error occur the user doesn't lose what he already wrote
            res.redirect(`/tableau-de-bord/nouvelle-note?savedTitle=${req.body.noteTitle}&savedContent=${req.body.noteContent}&errorMessage="Erreur ! Votre note n\'a pas pu être enregistré réessayez."`)
        }


    } catch (error) {
        console.log(error);
        // if any error occur the user doesn't lose what he already wrote
        res.redirect(`/tableau-de-bord/nouvelle-note?savedTitle=${req.body.noteTitle}&savedContent=${req.body.noteContent}&errorMessage="Erreur ! Votre note n\'a pas pu être enregistré réessayez."`)

    }
};

// POST search for note
exports.searchNote = async (req, res) => {
    const search = req.body.search
    res.redirect(`/tableau-de-bord?search=${search}`);

}