const express = require('express');
const User = require('../../models/User');

const uploadAvatar = async (req, res) => {
  const file = req.files.file;
  const user = await User.findById(req.user.id);

};  

module.exports = uploadAvatar;