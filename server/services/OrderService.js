const ModelService = require("./ModelService");

class OrderService extends ModelService {
  constructor() {
    super("[Order]");
  }

  async findOrdersByCustomerID(customerID) {
    try {
      const pool = await poolPromise;
      const query = `
        SELECT * FROM [Order]
        WHERE customerID = @customerID
        `;
      const result = await pool
        .request()
        .input("customerID", customerID)
        .query(query);

      return result.recordset;
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = new OrderService();
