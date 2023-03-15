const mongoose = require('mongoose');

var notesSchema = mongoose.Schema({
    title: String,
    content: String,
    badge : Array,
    create_by: {type : mongoose.Schema.Types.ObjectId, ref : "users"},
    create_at : { type : Date, default : Date.now},
})

module.exports = mongoose.model('notes', notesSchema)