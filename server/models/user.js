const mongoose = require('mongoose');

var notesSchema = mongoose.Schema({
    title: String,
    content: String,
    create_by: String,
    create_at : Date,
    last_updated : Date,
})

var usersSchema = mongoose.Schema({
    email: String,
    password: String,
    firstName : String,
    lastName : String,
    profile_img : String,
    notes : [notesSchema],
    token: String,
    google_id: String,
    facebook_id: String,
    insert_date : Date,
})

module.exports = mongoose.model('users', usersSchema)