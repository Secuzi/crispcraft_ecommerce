const Modelservice = require("./ModelService");

class MerchantService extends Modelservice {
  constructor() {
    super("Merchant");
  }
}

module.exports = new MerchantService();
