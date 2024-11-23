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

const getOrderSubTotal = async (req, res) => {
  const { id: orderID } = req.params;
  const pool = await poolPromise;

  const query = `
    SELECT * FROM OrderItem
    SELECT SUM(price * quantity) 
    FROM OrderItem
    WHERE orderID = @orderID
    
  `;

  const result = await pool.request().input("orderID", orderID).query(query);
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

const getTransactionLogData = async (req, res) => {
  try {
    const { id: orderID } = req.params;

    const pool = await poolPromise;
    const query = `
   SELECT 
    t.transactionID,
    t.orderID,
    t.deliveryID,
    o.orderDate,
    oi.orderItemID,
    oi.quantity,
	oi.price,
    p.productID,
    p.productName,
    f.flavorID,
    f.flavorName
FROM TransactionLog t
INNER JOIN [Order] o ON t.orderID = o.orderID
INNER JOIN OrderItem oi ON o.orderID = oi.orderID
INNER JOIN Product p ON oi.productID = p.productID
LEFT JOIN Flavor f ON p.flavorID = f.flavorID
ORDER BY t.transactionID, oi.orderItemID;
    
    `;

    const result = await pool
      .request()
      .input("customerID", orderID)
      .query(query);

    res.status(200).json(result.recordset);
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  getStockData,
  getCheckoutData,
  getSubTotal,
  updateOrderItemOrders,
  getTransactionLogData,
  getOrderSubTotal,
};
