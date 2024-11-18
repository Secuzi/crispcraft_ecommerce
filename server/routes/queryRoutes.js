const express = require("express");

const router = express.Router();

const { getStockData } = require("../controllers/queryController.js");

router.get("/stock", getStockData);

module.exports = router;
