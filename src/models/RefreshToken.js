const mongoose = require('mongoose');
const {
  VALIDATION: {
    REFRESH_TOKEN_MIN_LENGTH
  }
} = require('../common/config');

const refreshTokenSchema = new mongoose.Schema({
  refreshToken: {
    type: String,
    required: true,
    min: REFRESH_TOKEN_MIN_LENGTH,
  },
});

module.exports = mongoose.model('RefreshToken', refreshTokenSchema);