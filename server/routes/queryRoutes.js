const express = require("express");

const router = express.Router();

const {
  getStockData,
  getCheckoutData,
  getSubTotal,
} = require("../controllers/queryController.js");

router.get("/stock", getStockData);
router.get("/checkout/:id", getCheckoutData);
router.get("/total/:id", getSubTotal);
module.exports = router;
