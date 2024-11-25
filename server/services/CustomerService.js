// services/CustomerService.js
const ModelService = require("./ModelService");

class CustomerService extends ModelService {
  constructor() {
    super("Customer"); // Set the table name to 'Customer'
  }

  // Additional Customer-specific methods
  async findCustomersByCity(city) {
    const pool = await poolPromise;
    const query = `SELECT * FROM ${this.tableName} WHERE city = @city`;
    const result = await pool.request().input("city", city).query(query);
    return result.recordset;
  }
  async getByFieldCustomer(field, value) {
    return db("Customer").where(field, value).first(); // Adjust table name
  }
}

module.exports = new CustomerService();
