const express = require("express");
const {
  createDelivery,
  getAllDeliveries,
  getDelivery,
  updateDelivery,
  getDeliveryByOrderID,
} = require("../controllers/deliveryController");
const router = express.Router();

//@PATH /delivery
router.post("/", createDelivery);
router.get("/", getAllDeliveries);
router.get("/:id", getDelivery);
router.put("/:id", updateDelivery);
router.get("/orderID/:id", getDeliveryByOrderID);
module.exports = router;
