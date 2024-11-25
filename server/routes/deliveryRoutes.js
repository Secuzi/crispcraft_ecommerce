const express = require("express");
const {
  createDelivery,
  getAllDeliveries,
  getDelivery,
  updateDelivery,
  getDeliveryByOrderID,
  returnProductToInventory,
} = require("../controllers/deliveryController");
const router = express.Router();

//@PATH /delivery
router.post("/", createDelivery);
router.get("/", getAllDeliveries);
router.put("/cancel", returnProductToInventory);
router.get("/:id", getDelivery);
router.put("/:id", updateDelivery);
router.get("/orderID/:id", getDeliveryByOrderID);
module.exports = router;
