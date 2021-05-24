const mongoose = require('mongodb');


const articleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    createOn: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Blog', articleSchema);