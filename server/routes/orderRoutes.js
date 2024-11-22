const express = require("express");
const {
  getAllOrders,
  createOrder,
  updateOrder,
} = require("../controllers/orderController");

const router = express.Router();

router.get("/", getAllOrders);
router.post("/", createOrder);
router.put("/:id", updateOrder);

module.exports = router;
