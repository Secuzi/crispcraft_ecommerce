const express = require("express");
const {
  createPayment,
  getPaymentByOrderID,
} = require("../controllers/paymentController");

const router = express.Router();

router.post("/", createPayment);
router.get("/orderID/:id", getPaymentByOrderID);

module.exports = router;
