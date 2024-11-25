const Joi = require("joi");

const orderItemSchema = Joi.object({
  quantity: Joi.number().required(),
  productID: Joi.number().required(),
  customerID: Joi.number().required(),
  orderID: Joi.number().required(),
  price: Joi.number().required(),
});

module.exports = orderItemSchema;
