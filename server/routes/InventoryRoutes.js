const express = require("express");
const {
  getAllInventory,
  createInventory,
  getInventory,
  updateInventory,
  deleteInventory,
} = require("../controllers/inventoryController");
const router = express.Router();

router.get("/", getAllInventory);
router.post("/", createInventory);
router.get("/:id", getInventory);
router.put("/:id", updateInventory);
router.delete("/:id", deleteInventory);
module.exports = router;
