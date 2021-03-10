const Joi = require('joi');

const loginValidation = (requestBody) => {
  const schema =Joi.object().keys({
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required()
  });
  return schema.validate(requestBody);
};

module.exports = loginValidation;