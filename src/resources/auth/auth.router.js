const router = require('express').Router();
const User = require('../../models/User');
const registerValidation = require('../../validations/registerValidation');
const loginValidation = require('../../validations/loginValidation');
const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');


router.post('/register',  async (req, res) => {

  const {name, email, password} = req.body;
  const {error} = registerValidation(req.body);

  if(error) return res.status(400).send(error.details[0].message)

  const emailExistsInDB = await User.findOne({email: req.body.email});
  if (emailExistsInDB) return res.status(400).send('Email already exists');

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = new User({
    name: name,
    email: email,
    password: hashedPassword
  })
  
  try{
    const savedUser = await user.save();
    res.send({user: user._id})
  }catch(error){
    res.status(400).send(error)
  }
});

module.exports = router;