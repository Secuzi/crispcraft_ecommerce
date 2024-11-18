const ProductService = require("../services/ProductService");
const productSchema = require("../schemas/ProductShema");
const dayjs = require("dayjs");
const path = require("path");
const fs = require("fs");
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
    const parsedDate = dayjs(expirationDate, "YYYY-MM-DD");
    const formattedDate = parsedDate.format("YYYY-MM-DD");

    const searchedProduct = await ProductService.getByField(
      "productName",
      productName
    );

    if (searchedProduct) {
      if (req.file) {
        const filePath = path.join(`../${__dirname}`, "uploads", imagePath);
        console.log("path", filePath);
        fs.unlink(filePath, (err) => {
          if (err) console.error("Error deleting file:", err);
          else console.log("Uploaded file deleted due to error.");
        });
      }
      return res.status(400).json({ message: "Product already exist!" });
    }
    const { error, value: validatedProduct } = productSchema.validate(
      {
        productName,
        description,
        price,
        flavorID,
        expirationDate: formattedDate,
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

    return res
      .status(200)
      .json({ message: "Created Product!", productID: createdProduct.id });
  } catch (e) {
    console.log(e);
  }
};

const updateProduct = async (req, res) => {
  console.log(req.params);
  console.log(req.body);
  console.log("Image: ", req.file);

  //@TODO: Dili ni siya mahitabo if

  return res.status(200).json({ message: "Updated successfully!" });
};

module.exports = {
  getAllProducts,
  createProduct,
  updateProduct,
};
