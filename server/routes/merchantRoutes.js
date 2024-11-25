const express = require("express");
const {
  getAllMerchants,
  createMerchant,
  getMerchant,
  updateMerchant,
  deleteMerchant,
} = require("../controllers/merchantController");
const router = express.Router();

router.get("/", getAllMerchants);
router.post("/", createMerchant);
router.get("/:id", getMerchant);
router.put("/:id", updateMerchant);
router.delete("/:id", deleteMerchant);
module.exports = router;
