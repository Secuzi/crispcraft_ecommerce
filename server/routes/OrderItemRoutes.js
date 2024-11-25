const express = require("express");
const {
  getAllOrderItems,
  createOrderItem,
  updateOrderItem,
  updateOrderItemOrderID,
  deleteOrderItem,
  getOrderItemsByCustomerID,
} = require("../controllers/orderItemController");

const router = express.Router();

router.get("/", getAllOrderItems);
router.get("/customer/:id", getOrderItemsByCustomerID);
router.post("/", createOrderItem);
router.put("/:id", updateOrderItem);
router.put("/:id/order", updateOrderItemOrderID);
router.delete("/:id", deleteOrderItem);

module.exports = router;
