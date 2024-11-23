const ModelService = require("./ModelService");

class PaymentService extends ModelService {
  constructor() {
    super("Payment");
  }
}

module.exports = new PaymentService();
