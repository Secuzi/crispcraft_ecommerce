const ProductService = require("../services/ProductService");
const productSchema = require("../schemas/ProductShema");
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
    if (!req.file) {
      return res.status(400).json({ message: "Invalid image" });
    }
    const { destination, filename } = req.file;
    if (!destination || !filename) {
      return res.status(400).json({ message: "Invalid image" });
    }
    const imagePath = `${destination}/${filename}`;

    const { productName, description, price, flavorID, expirationDate } =
      req.body;

    const { error, value: validatedProduct } = productSchema.validate(
      {
        productName,
        description,
        price,
        flavorID,
        expirationDate,
        image: imagePath,
      },
      { abortEarly: false }
    );
    if (error) {
      const errorMessages = error.details.map((detail) => detail.message);

      console.log(errorMessages);
      return res.status(400).json({ message: errorMessages });
    }

    const createdProduct = await ProductService.create(validatedProduct);

    return res.status(200).json({ message: "Created Product!" });
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  getAllProducts,
  createProduct,
};
