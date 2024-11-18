const express = require("express");
const {
  createFlavor,
  getAllFlavors,
  getFlavor,
} = require("../controllers/flavorController");
const router = express.Router();

//@PATH /flavors
router.post("/", createFlavor);
router.get("/", getAllFlavors);
router.get("/:id", getFlavor);
module.exports = router;
