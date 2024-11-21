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
Product.productName, OrderItem.quantity, OrderItem.orderItemID
FROM Product 
INNER JOIN OrderItem ON Product.productID = OrderItem.productID
INNER JOIN Customer ON Customer.customerID = OrderItem.customerID

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
  SELECT  SUM(Product.price * OrderItem.quantity) AS subtotal
FROM OrderItem
INNER JOIN Product ON OrderItem.productID = Product.productID
INNER JOIN Customer ON OrderItem.customerID = Customer.customerID
WHERE Customer.customerID = @customerID
  
  `;

  const result = await pool
    .request()
    .input("customerID", customerID)
    .query(query);

  res.status(200).json(result.recordset[0]);
};

module.exports = {
  getStockData,
  getCheckoutData,
  getSubTotal,
};
