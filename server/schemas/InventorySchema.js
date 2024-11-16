const Joi = require("joi").extend(require("@joi/date"));

const inventorySchema = Joi.object({
  stockQty: Joi.number().required(),
  changeDate: Joi.date().format("YYYY-MM-DD HH:mm:ss").required(),
  productID: Joi.number().required(),
});

module.exports = inventorySchema;
