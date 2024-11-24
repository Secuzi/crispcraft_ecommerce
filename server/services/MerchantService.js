const Modelservice = require("./ModelService");

class MerchantService extends Modelservice {
  constructor() {
    super("Merchant");
  }

  async getByFieldMerchant(field, value) {
    return db("Merchant").where(field, value).first(); // Adjust table name
  }
}

module.exports = new MerchantService();
