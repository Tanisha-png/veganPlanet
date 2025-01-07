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
}, {
    timestamps: true,
});


const foodSchema = new mongoose.Schema({
    veganName: {
        type: String,
        required: true,
    },
    foodImage: {
        type: String,
    },
    alternativeFor: {
        type: String,
        required: true,
    },
    favoritedBy: {
        type: [Schema.Types.ObjectId],
        ref: 'User',
    },
    comments: [commentSchema],
});


module.exports = mongoose.model("Food", foodSchema);