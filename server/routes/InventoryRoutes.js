const express = require("express");
const {
  getAllInventory,
  createInventory,
  getInventory,
} = require("../controllers/inventoryController");
const router = express.Router();

router.get("/", getAllInventory);
router.post("/", createInventory);
router.get("/:id", getInventory);
module.exports = router;
