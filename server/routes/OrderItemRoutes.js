const express = require("express");
const {
  getAllOrderItems,
  createOrderItem,
  updateOrderItem,
  deleteOrderItem,
} = require("../controllers/orderItemController");

const router = express.Router();

router.get("/", getAllOrderItems);
router.post("/", createOrderItem);
router.put("/:id", updateOrderItem);
router.delete("/:id", deleteOrderItem);

module.exports = router;
