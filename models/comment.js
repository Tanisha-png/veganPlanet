const mongoose = require('mongoose');
const mongoose = mongoose.Schema;

const commentSchema = new mongoose.Schema({
    user: {
        type: String,
    },
    text: {
        type: String,
    },
    rating: {
        type: String,
    },
});

module.exports = mongoose.model('Comment', commentSchema);