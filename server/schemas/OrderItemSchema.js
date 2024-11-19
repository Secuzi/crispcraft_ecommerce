const Joi = require("joi");

const orderItemSchema = Joi.object({
  subtotal: Joi.number().required(),
  quantity: Joi.number().required(),
  productID: Joi.number().required(),
  customerID: Joi.number().required(),
});

module.exports = orderItemSchema;
