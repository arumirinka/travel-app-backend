const router = require('express').Router();
const User = require('../../models/User');

// const jwt = require('jsonwebtoken');
const Joi = require('joi');

const validationSchema =Joi.object().keys({
  name: Joi.string().min(6).required(),
  email: Joi.string().min(6).required().email(),
  password: Joi.string().min(6).required()
});

router.post('/register',  async (req, res) => {

  const {name, email, password} = req.body;
  const {error} = validationSchema.validate(req.body);

  if(error) return res.status(400).send(error.details[0].message)

  const user = new User({
    name: name,
    email: email,
    password: password
  })
  
  try{
    const savedUser = await user.save();
    res.send('saved new user')
  }catch(error){
    res.status(400).send(error)
  }
});

module.exports = router;