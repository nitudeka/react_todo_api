const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// User schema defination
const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  hashedPassword: {
    type: String,
    required: true
  },
  joined: {
    type: Number,
    required: true
  },
  tasks: [
    {
      date: Number,
      task: String,
      status: String
    }
  ]
})

module.exports = mongoose.model('users', userSchema);
