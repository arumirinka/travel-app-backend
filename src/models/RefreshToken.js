const mongoose = require('mongoose');
const {
  REFRESH_TOKEN_MIN_LENGTH
} = require('../common/config').VALIDATION;

const refreshTokenSchema = new mongoose.Schema({
  refreshToken: {
    type: String,
    required: true,
    min: REFRESH_TOKEN_MIN_LENGTH,
  },
})

module.exports = mongoose.model('RefreshToken', refreshTokenSchema);