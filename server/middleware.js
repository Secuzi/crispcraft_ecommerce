const productSchema = require("./schemas/ProductShema");
const ProductService = require("./services/ProductService");
const isAdmin = (req, res, next) => {
  const { role } = req.session.user;

  if (req.session.user && role !== "admin") {
    return res.status(403).json({ message: "Forbidden action" });
  }
  next();
};

const isLoggedIn = (req, res, next) => {
  const { user } = req.session;
  if (!user) {
    return res.status(401).json({ message: "Please log in!" });
  }
  next();
};

const validateProduct = async (req, res, next) => {
  const { productName, description, price, flavorID, expirationDate } =
    req.body;
  console.log("inside product middleware", productName);
  const searchedProduct = await ProductService.getByField(
    "productName",
    productName
  );

  if (searchedProduct) {
    return res.status(400).json({ message: "Product already exist!" });
  }

  const { error, value: validatedProduct } = productSchema.validate(
    {
      productName,
      description,
      price,
      flavorID,
      expirationDate,
    },
    { abortEarly: false }
  );
  if (error) {
    const errorMessages = error.details.map((detail) => detail.message);

    console.log(errorMessages);
    return res.status(400).json({ message: errorMessages });
  }

  req.validatedProduct = validatedProduct;
  next();
};

module.exports = {
  isAdmin,
  isLoggedIn,
  validateProduct,
};
