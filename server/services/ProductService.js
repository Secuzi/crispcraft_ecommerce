// services/CustomerService.js
const ModelService = require("./ModelService");

class ProductService extends ModelService {
  constructor() {
    super("Product"); // Set the table name to 'Customer'
  }

  // Additional Customer-specific methods
  async findCustomersByCity(city) {
    const pool = await poolPromise;
    const query = `SELECT * FROM ${this.tableName} WHERE city = @city`;
    const result = await pool.request().input("city", city).query(query);
    return result.recordset;
  }
  async calculateProductTotal() {
    const pool = await poolPromise;
    //Finish this
  }
}

module.exports = new ProductService();
