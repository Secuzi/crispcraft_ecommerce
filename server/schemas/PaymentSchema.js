const Joi = require("joi");

const paymentSchema = Joi.object({
  paymentMethod: Joi.string(),
  paymentAmount: Joi.number(),
  paymentDate: Joi.string(),
  orderID: Joi.number(),
});

module.exports = paymentSchema;
