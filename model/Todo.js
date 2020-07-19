const mongoose = require('mongoose');
const { Schema } = mongoose;

const TodoSchema = new Schema({
  text: String,
  completed: Boolean,
});

module.exports = mongoose.model('todo', TodoSchema);
