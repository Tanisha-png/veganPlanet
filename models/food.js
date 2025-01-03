const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const foodSchema = new mongoose.Schema ({
    veganName: {
        type: String,
        required: true,
    },
    alternativeFor: {
        type: String,
        required: true,
    },
    favroitedBy: {
        type: [Schema.Types.ObjectId],
        ref: 'User',
    },
    comments: [commentSchema],
});

module.exports = mongoose.model('Food', foodSchema);