const Modelservice = require("./ModelService");

class InventoryService extends Modelservice {
  constructor() {
    super("Inventory");
  }
}

module.exports = new InventoryService();
