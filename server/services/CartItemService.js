const ModelService = require("./ModelService");
const { poolPromise } = require("../connections/dbConnection");

class CartItemService extends ModelService {
  constructor() {
    super("CartItems");
  }

  async findCartItemsByCustomerID(customerID) {
    try {
      const pool = await poolPromise;
      const query = `
   SELECT Customer.customerID, CartItems.productID,
CartItems.cartItemID, CartItems.quantity, 
Product.price, Product.productName, Flavor.flavorName, 
Product.active 

FROM Customer 
INNER JOIN CartItems ON Customer.customerID = CartItems.customerID
INNER JOIN Product ON CartItems.productID = Product.productID
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
}

module.exports = new CartItemService();
