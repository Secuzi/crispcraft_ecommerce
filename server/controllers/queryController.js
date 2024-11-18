const { poolPromise } = require("../connections/dbConnection");

const getStockData = async (req, res) => {
  try {
    const pool = await poolPromise;
    const query = `
          
         SELECT Product.productID, Product.productName, Product.[description], Product.price, Product.expirationDate, Product.[image], Flavor.flavorID, Flavor.flavorName,
Inventory.inventoryID, Inventory.stockQty
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

module.exports = {
  getStockData,
};
