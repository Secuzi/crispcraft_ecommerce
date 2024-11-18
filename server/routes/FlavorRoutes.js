const express = require("express");
const {
  createFlavor,
  getAllFlavors,
  getFlavor,
  updateFlavor,
} = require("../controllers/flavorController");
const router = express.Router();

//@PATH /flavors
router.post("/", createFlavor);
router.get("/", getAllFlavors);
router.get("/:id", getFlavor);
router.put("/:id", updateFlavor);
module.exports = router;
