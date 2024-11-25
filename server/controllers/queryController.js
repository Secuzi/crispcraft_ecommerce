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
    SELECT SUM(price * quantity) AS subtotal
    FROM OrderItem
    WHERE orderID = @orderID
    
  `;

  const result = await pool.request().input("orderID", orderID).query(query);
  res.status(200).json(result.recordset[0]);
};

const getOrderList = async (req, res) => {
  try {
    const { id: customerID } = req.params;
    const pool = await poolPromise;

    const query = `
    SELECT [Order].orderID, Delivery.deliveryDate, Delivery.deliveryID
FROM [Order]
INNER JOIN Delivery ON Delivery.orderID = [Order].orderID
WHERE [Order].customerID = @customerID
    
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

const getMerchantDeliveryData = async (req, res) => {
  try {
    const { data } = req.query;
    console.log("data: ", data);
    if (!data) {
      res.status(400).json({ message: "NO DATA" });
    }
    const pool = await poolPromise;
    //     const query = `
    //   SELECT
    //     d.deliveryID,
    // 	d.deliveryDate,
    //     c.fName, c.lName,
    //     c.phoneNum,
    //     c.address,
    // 	d.reason,
    //     o.orderID,
    //     (
    //         SELECT
    //             p.productName,
    //             oi.quantity,
    //             oi.price,
    // 			f.flavorName,
    //             (oi.quantity * oi.price) AS subtotal
    //         FROM OrderItem oi
    //         INNER JOIN Product p ON oi.productID = p.productID
    // 		INNER JOIN Flavor f ON f.flavorID = p.flavorID
    //         WHERE oi.orderID = o.orderID
    //         FOR JSON PATH
    //     ) AS orderItems, -- JSON array of order items
    //     SUM(oi.quantity * oi.price) AS totalAmount -- Total amount for the order
    // FROM Delivery d
    // INNER JOIN [Order] o ON d.orderID = o.orderID
    // INNER JOIN Customer c ON o.customerID = c.customerID
    // INNER JOIN OrderItem oi ON o.orderID = oi.orderID
    // INNER JOIN Product p ON oi.productID = p.productID
    // WHERE d.deliveryStatus = @data -- Replace with your deliveryID parameter
    // GROUP BY d.deliveryID, d.deliveryDate, c.fName, c.lName, c.phoneNum, c.[address], o.orderID, d.reason;

    //     `;

    const query = `
     SELECT 
    d.deliveryID,
	d.deliveryDate,
    c.fName, c.lName,
    c.phoneNum,
    d.deliveryAddress, 
	d.reason,
	pm.paymentID,
    o.orderID,
    (
        SELECT 
            p.productName,
            oi.quantity,
            oi.price,
			f.flavorName,
            (oi.quantity * oi.price) AS subtotal
        FROM OrderItem oi
        INNER JOIN Product p ON oi.productID = p.productID
		INNER JOIN Flavor f ON f.flavorID = p.flavorID
        WHERE oi.orderID = o.orderID
        FOR JSON PATH
    ) AS orderItems, -- JSON array of order items
    SUM(oi.quantity * oi.price) AS totalAmount -- Total amount for the order
FROM Delivery d
INNER JOIN [Order] o ON d.orderID = o.orderID
INNER JOIN Customer c ON o.customerID = c.customerID
INNER JOIN OrderItem oi ON o.orderID = oi.orderID
INNER JOIN Product p ON oi.productID = p.productID
INNER JOIN Payment pm ON pm.orderID = o.orderID
WHERE d.deliveryStatus = @data -- Replace with your deliveryID parameter
GROUP BY d.deliveryID, d.deliveryDate, c.fName, c.lName, c.phoneNum, d.deliveryAddress, o.orderID, d.reason, pm.paymentID;
    
    
    `;

    const result = await pool.request().input("data", data).query(query);

    res.status(200).json(result.recordset);
  } catch (e) {
    console.log(e);
  }
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
  getOrderList,
  getMerchantDeliveryData,
};
