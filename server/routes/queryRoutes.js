const express = require("express");

const router = express.Router();

const {
  getStockData,
  getCheckoutData,
  getSubTotal,
  updateOrderItemOrders,
} = require("../controllers/queryController.js");

router.get("/stock", getStockData);
router.get("/checkout/:id", getCheckoutData);
router.get("/total/:id", getSubTotal);
router.put("/updateOrder", updateOrderItemOrders);
module.exports = router;
