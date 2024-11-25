const Joi = require("joi");

const cartItemSchema = Joi.object({
  productID: Joi.number().required(),
  customerID: Joi.number().required(),
  quantity: Joi.number().required(),
});

module.exports = cartItemSchema;
