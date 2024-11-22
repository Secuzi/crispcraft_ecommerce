const ModelService = require("./ModelService");

class OrderService extends ModelService {
  constructor() {
    super("[Order]");
  }
}

module.exports = new OrderService();
