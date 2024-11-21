const ModelService = require("./ModelService");
const { poolPromise } = require("../connections/dbConnection");

class OrderItemService extends ModelService {
  constructor() {
    super("OrderItem");
  }

  async findOrderItemsByCustomerID(customerID) {
    try {
      const pool = await poolPromise;
      const query = `
   SELECT Customer.customerID, OrderItem.productID,
OrderItem.orderItemID, OrderItem.quantity, 
Product.price, Product.productName, Flavor.flavorName

FROM Customer 
INNER JOIN OrderItem ON Customer.customerID = OrderItem.customerID
INNER JOIN Product ON OrderItem.productID = Product.productID
INNER JOIN Flavor ON Flavor.flavorID = Product.flavorID
WHERE Customer.customerID = @customerID;
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

  async updateOrderItem(orderItemID, data) {
    try {
      this.update(orderItemID, data, "orderItemID");
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = new OrderItemService();
