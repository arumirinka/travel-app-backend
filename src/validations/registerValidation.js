const Joi = require('joi');
const {
  VALIDATION:{
    USER_NAME_MIN_LENGTH,
    USER_EMAIL_MIN_LENGTH,
    USER_PASSWORD_MIN_LENGTH,
  }
} = require('../common/config');

const registerValidation = (requestBody) => {
  const schema =Joi.object().keys({
    name: Joi.string().min(USER_NAME_MIN_LENGTH).required(),
    email: Joi.string().min(USER_EMAIL_MIN_LENGTH).required().email(),
    password: Joi.string().min(USER_PASSWORD_MIN_LENGTH).required()
  });
  return schema.validate(requestBody);
};



module.exports = registerValidation;