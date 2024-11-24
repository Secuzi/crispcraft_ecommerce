const express = require("express");

const router = express.Router();

const {
  getStockData,
  getCheckoutData,
  getSubTotal,
  updateOrderItemOrders,
  getTransactionLogData,
  getOrderSubTotal,
  getOrderList,
} = require("../controllers/queryController.js");

router.get("/stock", getStockData);
router.get("/checkout/:id", getCheckoutData);
router.get("/total/:id", getSubTotal);
router.put("/updateOrder", updateOrderItemOrders);
router.get("/transaction-data", getTransactionLogData);
router.get("/order-subtotal/:id", getOrderSubTotal);
router.get("/order-list/:id", getOrderList);
module.exports = router;
