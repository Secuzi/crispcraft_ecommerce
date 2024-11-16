const InventoryService = require("../services/InventoryService");
//@path GET /inventory
const getAllInventory = async (req, res) => {
  try {
    const inventories = await InventoryService.getAll();
    res.send({ inventories });
  } catch (e) {
    console.log(e);
  }
};

const createInventory = async (req, res) => {
  try {
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  getAllInventory,
};
