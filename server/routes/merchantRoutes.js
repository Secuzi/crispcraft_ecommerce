const express = require("express");
const {
  getAllMerchants,
  createMerchant,
  getMerchant,
  updateMerchant,
} = require("../controllers/merchantController");
const router = express.Router();

router.get("/", getAllMerchants);
router.post("/", createMerchant);
router.get("/:id", getMerchant);
router.put("/:id", updateMerchant);
module.exports = router;
