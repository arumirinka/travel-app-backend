const mongoose = require('mongoose');

const refreshTokenSchema = new mongoose.Schema({
  refreshToken: {
    type: String,
    required: true,
    min: 6
  },
})

module.exports = mongoose.model('RefreshToken', refreshTokenSchema);