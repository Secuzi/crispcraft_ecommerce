const express = require("express");

const router = express.Router();

const {
  getAllTransactionLogs,
  createTransactionLog,
} = require("../controllers/transactionLogController");

//@path /transaction-log

router.get("/", getAllTransactionLogs);
router.post("/", createTransactionLog);
module.exports = router;
