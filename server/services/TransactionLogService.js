// services/CustomerService.js
const ModelService = require("./ModelService");

class TransactionLogService extends ModelService {
  constructor() {
    super("TransactionLog"); // Set the table name to 'Customer'
  }
}

module.exports = new TransactionLogService();
