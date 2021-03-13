const mongoose = require('mongoose');
const {
  USER_NAME_MIN_LENGTH,
  USER_EMAIL_MIN_LENGTH,
  USER_EMAIL_MAX_LENGTH,
  USER_PASSWORD_MAX_LENGTH,
  USER_PASSWORD_MIN_LENGTH
} = require('../common/config').VALIDATION;

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: USER_NAME_MIN_LENGTH
  },
  email: {
    type: String,
    required: true,
    max: USER_EMAIL_MAX_LENGTH,
    min: USER_EMAIL_MIN_LENGTH
  },
  password: {
    type: String,
    required: true,
    max: USER_PASSWORD_MAX_LENGTH,
    min: USER_PASSWORD_MIN_LENGTH
  },
  date: {
    type: Date,
    default: Date.now,
  }
})

module.exports = mongoose.model('User', userSchema);