const Joi = require("joi");

const adminSchema = Joi.object({
  fName: Joi.string().required(),
  lName: Joi.string().required(),
  phoneNum: Joi.string().max(11).required(),
  email: Joi.string().email().required(),
  role: Joi.string(),
});

module.exports = adminSchema;
