const express = require("express");
const bycrypt = require("bcrypt");
const router = express.Router();
const {
  getAllCustomers,
  getCustomer,
  createCustomer,
  deleteCustomer,
  updateCustomer,
} = require("../controllers/customerController");

router.get("/", getAllCustomers);

router.get("/:id", getCustomer);

router.post("/", createCustomer);

router.delete("/:id", deleteCustomer);

router.put("/:id", updateCustomer);

module.exports = router;
