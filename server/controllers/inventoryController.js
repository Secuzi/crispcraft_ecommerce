const inventorySchema = require("../schemas/InventorySchema.js");
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
    let { stockQty, changeDate, productID } = req.body;
    changeDate = new Date();

    const { error, value: validatedInventory } = inventorySchema.validate(
      {
        stockQty,
        changeDate,
        productID,
      },
      { abortEarly: false }
    );

    console.log(changeDate);
    if (error) {
      const errorMessages = error.details.map((detail) => detail.message);
      return res.status(400).json({ message: errorMessages });
    }

    console.log(validatedInventory);

    const newInventory = await InventoryService.create(validatedInventory);

    res.status(200).json({ message: req.body });
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  getAllInventory,
  createInventory,
};
