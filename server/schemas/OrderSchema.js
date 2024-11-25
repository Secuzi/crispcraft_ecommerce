const Joi = require("joi");

const orderSchema = Joi.object({
  orderDate: Joi.string().required(),
  status: Joi.string().required(),
  customerID: Joi.number().required(),
});

module.exports = orderSchema;
