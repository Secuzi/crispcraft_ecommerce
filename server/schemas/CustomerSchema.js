const Joi = require("joi");

const customerSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  address: Joi.string().required(),
  phoneNum: Joi.string().max(11).required(),
  fName: Joi.string().required(),
  lName: Joi.string().required(),
  city: Joi.string().required(),
  state: Joi.string().required(),
  role: Joi.string(),
});

module.exports = customerSchema;
