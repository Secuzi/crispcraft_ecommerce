const express = require("express");
const {
  getAllInventory,
  createInventory,
  getInventory,
  updateInventory,
  deleteInventory,
  updateInventoryStock,
} = require("../controllers/inventoryController");
const router = express.Router();

router.get("/", getAllInventory);
router.post("/", createInventory);
router.get("/:id", getInventory);
router.put("/update-stock", updateInventoryStock);
router.put("/:id", updateInventory);
router.delete("/:id", deleteInventory);
module.exports = router;
