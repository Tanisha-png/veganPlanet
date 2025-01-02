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
    comments: [commentSchema],
    favroitedBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
});

module.exports = mongoose.model('Food', foodSchema);