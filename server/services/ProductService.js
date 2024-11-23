// services/CustomerService.js
const ModelService = require("./ModelService");

class ProductService extends ModelService {
  constructor() {
    super("Product"); // Set the table name to 'Customer'
  }
}

module.exports = new ProductService();
