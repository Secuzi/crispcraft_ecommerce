const TransactionLogService = require("../services/TransactionLogService");
const transactionLogSchema = require("../schemas/TransactionLogSchema");

//@path GET /transaction-log
const getAllTransactionLogs = async (req, res) => {
  try {
    const transactionLogs = await TransactionLogService.getAll();
    res.send({ transactionLogs });
  } catch (e) {
    console.log(e);
  }
};

const createTransactionLog = async (req, res) => {
  try {
    const { orderID, deliveryID } = req.body;

    const { error, value: validatedTransactionLog } =
      transactionLogSchema.validate(
        {
          orderID,
          deliveryID,
        },
        { abortEarly: false }
      );
    if (error) {
      const errorMessages = error.details.map((detail) => detail.message);

      console.log(errorMessages);
      return res.status(400).json({ message: errorMessages });
    }
    const createdTransactionLog = await TransactionLogService.create(
      validatedTransactionLog
    );

    return res.status(200).json({
      message: "Created Transaction Log!",
      transactionID: createdTransactionLog.id,
    });
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  getAllTransactionLogs,
  createTransactionLog,
};
