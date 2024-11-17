const Joi = require("joi").extend(require("@joi/date"));

const inventorySchema = Joi.object({
  stockQty: Joi.number().required(),
  changeDate: Joi.string().required(),
  productID: Joi.number().required(),
});

module.exports = inventorySchema;
