const express = require("express");
const { createFlavor } = require("../controllers/flavorController");
const router = express.Router();

//@PATH /flavors
router.post("/", createFlavor);

module.exports = router;
