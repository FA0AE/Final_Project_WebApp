const mongoose = require('mongoose');

const subjectSchema = mongoose.Schema({
    name: {
        type: String, 
        required: true,
        unique: true,
        trim: true
    },
    professor: {
        type: String,
        required: true,
        trim: true
    }
}, {
    versionKey: false
});

module.exports = mongoose.model('Subject', subjectSchema);