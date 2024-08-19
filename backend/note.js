const mongoose = require('mongoose');


const noteSchema = new mongoose.Schema({
    id: { type: Number, required: false, unique: true },
    title: { type: String, required: false },
    author: {
        name: { type: String, required: false },
        email: { type: String, required: false }
    },
    content: { type: String, required: false }
});

const Note = mongoose.model('Note', noteSchema);
module.exports = Note;