const Joi = require("joi");

const merchantSchema = Joi.object({
  fName: Joi.string().required(),
  lName: Joi.string().required(),
  phoneNumber: Joi.string().max(11).required(),
  telNumber: Joi.string().required(),
  email: Joi.string().email().required(),
});

module.exports = merchantSchema;
