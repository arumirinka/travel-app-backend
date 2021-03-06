const jwt = require('jsonwebtoken');
const {ACCESS_TOKEN_SECRET} = require('../common/config');

const tokenValidation = (req, res, next) => {
  const token = req.header('authToken');
  if (!token) {
    return res.status(401).send('Access denied!');
  } 
  try{
    const verified = jwt.verify(token, ACCESS_TOKEN_SECRET);
    req.user = verified;
    next();
  }
  catch(error){
    res.status(400).send('Invalid token!');
  }
};

module.exports = tokenValidation;