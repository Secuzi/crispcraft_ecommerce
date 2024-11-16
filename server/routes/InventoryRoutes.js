const express = require("express");
const {
  getAllInventory,
  createInventory,
} = require("../controllers/inventoryController");
const router = express.Router();

router.get("/", getAllInventory);
router.post("/", createInventory);
module.exports = router;
