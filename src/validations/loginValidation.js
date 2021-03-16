const Joi = require('joi');
const {
  VALIDATION:{
    USER_EMAIL_MIN_LENGTH,
    USER_PASSWORD_MIN_LENGTH,
  }
} = require('../common/config');

const loginValidation = (requestBody) => {
  const schema =Joi.object().keys({
    email: Joi.string().min(USER_EMAIL_MIN_LENGTH).required().email(),
    password: Joi.string().min(USER_PASSWORD_MIN_LENGTH).required()
  });
  return schema.validate(requestBody);
};

module.exports = loginValidation;