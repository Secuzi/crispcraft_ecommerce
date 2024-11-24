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

//@path GET /inventory/:id
const getInventory = async (req, res) => {
  const id = Number(req.params.id);
  const inventory = await InventoryService.read(id, "inventoryID");

  if (!inventory) {
    return res.status(400).send("Cannot find Inventory");
  }
  return res.status(200).json({ inventory });
};

const updateInventory = async (req, res) => {
  const { id } = req.params;
  let { stockQty, changeDate } = req.body;
  console.log("STOOCK: ", stockQty);
  if (stockQty === null || typeof stockQty === "undefined") {
    return res
      .status(400)
      .json({ message: "stock quantity must not be null!" });
  }

  const inventory = await InventoryService.read(id, "inventoryID");
  if (!inventory) {
    return res.status(400).send("Cannot find Inventory");
  }
  changeDate = dayjs().format("YYYY-MM-DD HH:mm:ss");

  const updatedInventory = await InventoryService.update(
    id,
    {
      stockQty,
      changeDate,
    },
    "inventoryID"
  );

  return res.status(200).json(updatedInventory);
};

const createInventory = async (req, res) => {
  try {
    let { stockQty, changeDate, productID } = req.body;

    changeDate = dayjs().format("YYYY-MM-DD HH:mm:ss");
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
      inventoryID: newInventory.id,
    });
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  getAllInventory,
  createInventory,
  getInventory,
  updateInventory,
};
