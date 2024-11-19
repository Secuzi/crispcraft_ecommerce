const ModelService = require("./ModelService");

class OrderItemService extends ModelService {
  constructor() {
    super("OrderItem");
  }
}

module.exports = new OrderItemService();
