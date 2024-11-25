const Joi = require("joi");

const deliverySchema = Joi.object({
  deliveryDate: Joi.string().required(),
  cashCollected: Joi.number(),
  deliveryStatus: Joi.string().required(),
  orderID: Joi.number().required(),
  merchantID: Joi.number(),
  deliveryAddress: Joi.string(),
});

module.exports = deliverySchema;
