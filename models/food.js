const mongoose = require("mongoose");
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
        type: Number,
        required: false,
    },
});


const foodSchema = new mongoose.Schema({
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


module.exports = mongoose.model("Food", foodSchema);