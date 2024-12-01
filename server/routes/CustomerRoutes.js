const express = require("express");

const router = express.Router();
const { isAdmin, isLoggedIn } = require("../middleware");
const {
  getAllCustomers,
  getCustomer,
  createCustomer,
  deleteCustomer,
  updateCustomer,
  getCustomerByField,
} = require("../controllers/customerController");

router.get("/", getAllCustomers);
router.get("/field", getCustomerByField);

router.get("/:id", getCustomer);

router.post("/", createCustomer);

router.delete("/:id", isLoggedIn, isAdmin, deleteCustomer);

router.put("/:id", isLoggedIn, isAdmin, updateCustomer);

module.exports = router;
