const mongoose = require('mongoose');

var usersSchema = mongoose.Schema({
    email: String,
    password: String,
    firstName : String,
    lastName : String,
    profile_img : String,
    notes : [{type : mongoose.Schema.Types.ObjectId, ref: 'notes'}],
    token: String,
    google_id: String,
    facebook_id: String,
    insert_date : Date,
})

module.exports = mongoose.model('users', usersSchema)