const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const foodSchema = new Schema ({
    veganName: {
        type: String,
        required: true,
    },
    alternativeFor: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model('Food', foodSchema);