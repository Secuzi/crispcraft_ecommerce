const Joi = require("joi");

const orderSchema = Joi.object({
  orderDate: Joi.string().required(),
  orderItemID: Joi.number().required(),
  customerID: Joi.number().required(),
});

module.exports = orderSchema;
