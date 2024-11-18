const ModelService = require("./ModelService");

class FlavorService extends ModelService {
  constructor() {
    super("Flavor");
  }
}

module.exports = new FlavorService();
