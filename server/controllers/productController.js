const ProductService = require("../services/ProductService");

//@path GET /products
const getAllProducts = async (req, res) => {
  try {
    const products = await ProductService.getAll();
    res.send({ products });
  } catch (e) {
    console.log(e);
  }
};
//@path POST /products

const createProduct = async (req, res) => {
  try {
    const { destination, filename } = req.file;
    const imagePath = `${destination}/${filename}`;

    console.log(imagePath);
    const { productName, description, price, flavorID, expirationDate } =
      req.body;

    const createdProduct = await ProductService.create({
      productName,
      description,
      price,
      flavorID,
      expirationDate,
      image: imagePath,
    });

    return res.status(200).json({ message: "Created Product!" });
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  getAllProducts,
  createProduct,
};
