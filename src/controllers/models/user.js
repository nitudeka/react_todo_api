// dependencies
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  hashedPassword: String,
  joined: Date,
  tasks: {
    type: Object,
    default: {}
  }
})

module.exports = mongoose.model('users', userSchema);
