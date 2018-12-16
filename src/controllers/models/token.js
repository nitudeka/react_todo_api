const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tokenSchema = new Schema({
  email: String
})

module.exports = mongoose.model('tokens', tokenSchema);
