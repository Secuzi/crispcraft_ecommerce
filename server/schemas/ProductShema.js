const Joi = require("joi");

const productSchema = Joi.object({
  productName: Joi.string().required(),
  description: Joi.string().required(),
  price: Joi.number().required(),
  flavorID: Joi.number().required(),
  expirationDate: Joi.string().required(),
  image: Joi.string().required(),
});

module.exports = productSchema;
