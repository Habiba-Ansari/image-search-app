const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  googleId: String,
  facebookId: String,
  githubId: String,
  name: String,
  email: String,
  avatar: String,
}, {
  timestamps: true
});

module.exports = mongoose.model('User', userSchema);