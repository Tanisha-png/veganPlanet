const mongoose = require("mongoose");
// Shortcut variable
const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
}, {timestamps: true});


module.exports = mongoose.model("User", userSchema);
