const router = require('express').Router();
const User = require('../../models/User');
const verify = require('../../validations/tokenValidation');

router.get('/', verify,  async (req, res) => {
  const {_id, name, email}  = await User.findById(req.user._id).exec();
  res.json({_id, name, email})
})

module.exports = router;