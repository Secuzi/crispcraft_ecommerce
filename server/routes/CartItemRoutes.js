const express = require("express");
const router = express.Router();

const {
  createCartItem,
  updateCartItem,
  getAllCartItems,
  deleteCartItem,
  getCartItemsByCustomerID,
} = require("../controllers/cartItemController");

router.get("/", getAllCartItems);
router.get("/customer/:id", getCartItemsByCustomerID);

router.post("/", createCartItem);

router.put("/:id", updateCartItem);

router.delete("/:id", deleteCartItem);

module.exports = router;
