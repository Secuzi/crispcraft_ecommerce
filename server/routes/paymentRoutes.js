const express = require("express");
const {
  createPayment,
  getPaymentByOrderID,
  updatePayment,
} = require("../controllers/paymentController");

const router = express.Router();

router.post("/", createPayment);
router.get("/orderID/:id", getPaymentByOrderID);
router.put("/:id", updatePayment);

module.exports = router;
