const mongoose = require('mongoose');

const activitySchema = mongoose.Schema({
    subject_name: { type: String, required: true },
    title: { type: String, unique: true, required: true },
    description: { type: String, required: true },
    due_date: { type: Date, required: true }
}, {
    versionKey: false
});

module.exports = mongoose.model('Activity', activitySchema);