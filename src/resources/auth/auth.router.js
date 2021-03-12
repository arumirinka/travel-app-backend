const router = require('express').Router();
const User = require('../../models/User');
const RefreshToken = require('../../models/RefreshToken');
const registerValidation = require('../../validations/registerValidation');
const loginValidation = require('../../validations/loginValidation');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


router.post('/register',  async (req, res) => {

  const {name, email, password} = req.body;
  const {error} = registerValidation(req.body);

  if (error) {
    return res.status(400).send(error.details[0].message)
  }

  const emailExistsInDB = await User.findOne({email: req.body.email});
  if (emailExistsInDB) {
    return res.status(400).send('Email already exists');
  }

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

router.post('/token', async(req, res) => {
  const {refreshToken} = req.body;
  if (!refreshToken) {
    return res.status(401);
  }
  const validToken = await RefreshToken.findOne({refreshToken});
  if(!validToken) {
    return res.sendStatus(403);
  }
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (error, user) => {
    if(error) {
      return res.sendStatus(403);
    }
    const accessToken = jwt.sign({_id: user._id}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '15m'});
    res.json({accessToken})
  })
});

router.delete('/logout', async (req, res) => {
  await RefreshToken.deleteOne({refreshToken: req.body.refreshToken});
  res.sendStatus(204);
})

router.post('/login', async (req, res) => {
  const {email, password} = req.body;
  const {error} = loginValidation(req.body);

  if(error) {
    return res.status(400).send(error.details[0].message);
  }

  const userRegistered = await User.findOne({email});
  if (!userRegistered) {
    return res.status(400).send('There is no such user registered.');
  }

  const validPassword = await bcrypt.compare(password, userRegistered.password);
  if(!validPassword) {
    return res.status(400).send('Wrong password');
  }

  const token = jwt.sign({_id: userRegistered._id}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '15m'});
  const refreshToken = jwt.sign({_id: userRegistered._id}, process.env.REFRESH_TOKEN_SECRET);
  const newRefreshToken = new RefreshToken({
    refreshToken
  });
  try{
    const savedRefreshToken = await newRefreshToken.save();
    res.json({'authToken': token, 'refreshToken': refreshToken});
  }catch(error){
    res.status(400).send(error)
  }
});

module.exports = router;