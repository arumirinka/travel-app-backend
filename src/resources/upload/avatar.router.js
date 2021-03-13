const router = require('express').Router();
const User = require('../../models/User');
const verify = require('../../validations/tokenValidation');
const Uuid = require('uuid');
const fs = require('fs');

router.post('/', verify, async (req, res) => {
  try{
    const file = req.files.image;
    const user = await User.findById(req.user._id);
    const avatarName = `${Uuid.v4()}.jpeg`;
    file.mv(`${process.cwd()}\\src\\static\\${avatarName}`);
    user.avatar = avatarName;
    await user.save();
    return res.json(user)
  }catch(error){
    console.log(error);
    return res.status(400).json({message: 'Upload error'});
  }
});

router.delete('/', verify, async (req, res) => {
  try{
    const user = await User.findById(req.user._id);
    fs.unlinkSync(`${process.cwd()}\\src\\static\\${user.avatar}`);
    user.avatar = null;
    await user.save();
    return res.json(user)
  }catch(error){
    console.log(error);
    return res.status(400).json({message: 'Deletion error'});
  }
});

module.exports = router;