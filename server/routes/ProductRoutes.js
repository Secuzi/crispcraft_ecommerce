const express = require("express");

const multer = require("multer");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads"); // Directory to store uploaded files
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName); // Generate a unique filename
  },
});
const upload = multer({ storage });
const router = express.Router();
const { validateProduct } = require("../middleware");
const {
  getAllProducts,
  createProduct,
  updateProduct,
} = require("../controllers/productController");

router.get("/", getAllProducts);

router.post("/", upload.single("image"), createProduct);
router.put("/:id", upload.single("image"), updateProduct);
module.exports = router;
