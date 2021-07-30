const mongoose = require("mongoose");
const User = require("../models/User");

const TodoSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  checked: {
    type: Boolean,
    required: true,
    default: false,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: User,
  },
});



module.exports = mongoose.model("Todos", TodoSchema);
