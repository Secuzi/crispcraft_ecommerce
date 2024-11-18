const inventorySchema = require("../schemas/InventorySchema.js");
const InventoryService = require("../services/InventoryService");
const dayjs = require("dayjs");
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

    changeDate = dayjs().format("YYYY-MM-DD HH:mm:ss");
    console.log(changeDate);
    const { error, value: validatedInventory } = inventorySchema.validate(
      {
        stockQty,
        changeDate,
        productID,
      },
      { abortEarly: false }
    );

    if (error) {
      const errorMessages = error.details.map((detail) => detail.message);
      return res.status(400).json({ message: errorMessages });
    }

    const newInventory = await InventoryService.create(validatedInventory);

    res.status(200).json({
      message: "Inventory successfully created",
      inventoryID: newInventory.inventoryID,
    });
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  getAllInventory,
  createInventory,
};
