const ProductService = require("../services/ProductService");

//@path GET /products
const getAllProducts = async (req, res) => {
  const products = await ProductService.getAll();
  res.send({ products });
};
//

module.exports = {
  getAllProducts,
};
