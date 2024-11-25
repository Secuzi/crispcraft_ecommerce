const Modelservice = require("./ModelService");

class AdminService extends Modelservice {
  constructor() {
    super("[Admin]");
  }

  async getByFieldMerchant(field, value) {
    return db("[Admin]").where(field, value).first(); // Adjust table name
  }
}

module.exports = new AdminService();
