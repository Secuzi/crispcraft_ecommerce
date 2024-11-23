const { poolPromise } = require("../connections/dbConnection");

const getStockData = async (req, res) => {
  try {
    const pool = await poolPromise;
    const query = `
          
         SELECT Product.productID, Product.productName, Product.[description], Product.price, Product.expirationDate, Product.[image], Flavor.flavorID, Flavor.flavorName,
Inventory.inventoryID, Inventory.stockQty, Product.active
FROM Product
INNER JOIN Flavor ON Product.flavorID = Flavor.flavorID
INNER JOIN Inventory ON Inventory.productID = Product.productID
   
          `;

    const result = await pool.request().query(query);
    return res.json(result.recordset);
  } catch (e) {
    console.log(e);
  }
};

const getCheckoutData = async (req, res) => {
  try {
    const { id: customerID } = req.params;

    const pool = await poolPromise;
    const query = `
    SELECT Product.productID, Product.[image], Product.price, Customer.address,
Product.productName, CartItems.quantity, CartItems.cartItemID
FROM Product 
INNER JOIN CartItems ON Product.productID = CartItems.productID
INNER JOIN Customer ON Customer.customerID = CartItems.customerID

WHERE Customer.customerID = @customerID
    
    `;

    const result = await pool
      .request()
      .input("customerID", customerID)
      .query(query);

    res.status(200).json(result.recordset);
  } catch (e) {
    console.log(e);
  }
};

const getSubTotal = async (req, res) => {
  const { id: customerID } = req.params;
  const pool = await poolPromise;

  const query = `
   SELECT  SUM(Product.price * CartItems.quantity) AS subtotal
  FROM CartItems
  INNER JOIN Product ON CartItems.productID = Product.productID
  INNER JOIN Customer ON CartItems.customerID = Customer.customerID
  WHERE Customer.customerID = @customerID
  
  `;

  const result = await pool
    .request()
    .input("customerID", customerID)
    .query(query);

  res.status(200).json(result.recordset[0]);
};

const updateOrderItemOrders = async (req, res) => {
  const { orderID, customerID } = req.body;
  console.log(req.body);
  console.log("ORDER ID: ", orderID);
  console.log("Customer ID: ", customerID);
  const pool = await poolPromise;

  const query = ` 
    UPDATE OrderItem
    SET orderID = @orderID
    WHERE customerID = @customerID
  `;

  const result = await pool
    .request()
    .input("customerID", customerID)
    .input("orderID", orderID)
    .query(query);

  console.log("REEEY: ", result);
  res.status(200).json(result.recordset);
};

module.exports = {
  getStockData,
  getCheckoutData,
  getSubTotal,
  updateOrderItemOrders,
};
