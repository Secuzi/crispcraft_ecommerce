const express = require("express");
const {
  createFlavor,
  getAllFlavors,
  getFlavor,
  updateFlavor,
  deleteFlavor,
} = require("../controllers/flavorController");
const router = express.Router();

//@PATH /flavors
router.post("/", createFlavor);
router.get("/", getAllFlavors);
router.get("/:id", getFlavor);
router.put("/:id", updateFlavor);
router.delete("/:id", deleteFlavor);
module.exports = router;
