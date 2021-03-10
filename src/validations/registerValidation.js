const Joi = require('joi');

const registerValidation = (requestBody) => {
  const schema =Joi.object().keys({
    name: Joi.string().min(6).required(),
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required()
  });
  return schema.validate(requestBody);
};



module.exports = registerValidation;