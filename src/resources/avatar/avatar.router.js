const cloudinary = require('cloudinary').v2;
const router = require('express').Router();
const multer = require('multer');
const verify = require('../../validations/tokenValidation');
const path = require('path');
const User = require('../../models/User');
const { 
  CLOUDINARY: {
    CLOUDINARY_AVATAR_UPLOAD_PRESET,
  }, 
} = require('../../common/config');
const fs = require('fs');

const loader = multer({dest: path.join(__dirname, 'tmp')});

router.post('/', [verify, loader.single('avatar')],  async (req, res) => {
  try{
    const result = await cloudinary.uploader.upload(
      req.file.path, {upload_preset: CLOUDINARY_AVATAR_UPLOAD_PRESET}
    );
    const userRegistered = await User.findOne({_id: req.user._id})
    
    userRegistered.avatar = result.secure_url;
    const savedUser = await userRegistered.save();
    res.send({avatar: savedUser.avatar});
  }
  catch(error) {
    res.status(400);
  }
  fs.unlinkSync(req.file.path);
});

module.exports  = router;