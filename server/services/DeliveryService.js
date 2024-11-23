const ModelService = require("./ModelService");

class DeliveryService extends ModelService {
  constructor() {
    super("Delivery");
  }
}

module.exports = new DeliveryService();
