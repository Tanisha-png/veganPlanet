const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new mongoose.Schema({
    user: {
        type: String,
        required: true,
    },
    text: {
        type: String,
        required: true,
    },
    rating: {
        type: String,
        required: false,
    },
});

module.exports = mongoose.model('Comment', commentSchema);