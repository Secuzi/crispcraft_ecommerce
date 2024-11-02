const express = require("express");

const router = express.Router();
const {
  getAllCustomers,
  getCustomer,
  createCustomer,
  deleteCustomer,
} = require("../controllers/customerController");

router.get("/", getAllCustomers);

router.get("/:id", getCustomer);

router.post("/", createCustomer);

router.delete("/:id", deleteCustomer);

module.exports = router;
