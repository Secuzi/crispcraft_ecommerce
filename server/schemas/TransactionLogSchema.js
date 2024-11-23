const Joi = require("joi");

const transactionLogSchema = Joi.object({
  orderID: Joi.number().required(),
  deliveryID: Joi.number().required(),
});

module.exports = transactionLogSchema;
