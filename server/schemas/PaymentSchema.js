const Joi = require("joi");

const paymentSchema = Joi.object({
  paymentMethod: Joi.string().required(),
  paymentAmount: Joi.number(),
  paymentDate: Joi.string(),
  orderID: Joi.number().required(),
});

module.exports = paymentSchema;
