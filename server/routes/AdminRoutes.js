const express = require("express");
const { getAdmin } = require("../controllers/adminController");
const router = express.Router();

router.get("/:id", getAdmin);

module.exports = router;
