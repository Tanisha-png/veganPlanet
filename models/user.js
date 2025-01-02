const mongoose = require("mongoose");
// Shortcut variable
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
});

const commentSchema = new Schema({
  user: {
    type: String,
  },
  text: {
    type: String,
  },
  rating: {
    type: String,
  },
  favoritedBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  }
});

module.exports = mongoose.model("User", userSchema);
