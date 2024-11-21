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

const getProductByName = async (req, res) => {
  const { productName } = req.params;
  const searchedProduct = await ProductService.getByField(
    "productName",
    productName
  );

  res.status(200).json(searchedProduct);
};

//@path GET /products/:id
const getProduct = async (req, res) => {
  const id = Number(req.params.id);
  const product = await ProductService.read(id, "productID");

  if (!product) {
    return res.status(400).send("Cannot find Product");
  }
  return res.status(200).json({ product });
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const searchedProduct = await ProductService.read(id, "productID");
  const imageFile = req.file;
  console.log(searchedProduct);
  const imagePath = imageFile
    ? `uploads/${imageFile.filename}`
    : searchedProduct.image;

  console.log("IMAGEEE: ", imagePath);
  const { productName, description, price, flavorID, expirationDate, active } =
    req.body;
  const parsedDate = dayjs(expirationDate, "YYYY-MM-DD");
  const formattedDate = parsedDate.format("YYYY-MM-DD");

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
  validatedProduct.active = active;

  const updatedProduct = await ProductService.update(
    id,
    validatedProduct,
    "productID"
  );
  //@TODO: Dili ni siya mahitabo if

  return res
    .status(200)
    .json({ message: "Updated successfully!", updatedProduct });
};

const deleteProduct = async (req, res) => {
  try {
    const id = Number(req.params.id);
    await ProductService.delete(id, "productID");

    return res.status(200).json({ message: "Deleted product!" });
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  getAllProducts,
  createProduct,
  updateProduct,
  getProduct,
  getProductByName,
  deleteProduct,
};
