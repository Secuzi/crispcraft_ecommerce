const inventorySchema = require("../schemas/InventorySchema.js");
const InventoryService = require("../services/InventoryService");
const ProductService = require("../services/ProductService.js");
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

  console.log("WHY AM I HEEEEEEEEEEEEEEEEEEEEEEREEEEE");
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

const deleteInventory = async (req, res) => {
  try {
    const id = Number(req.params.id);
    await InventoryService.delete(id, "inventoryID");

    return res.status(200).json({ message: "Deleted Inventory!" });
  } catch (e) {
    console.log(e);
  }
};
const updateInventoryStock = async (req, res) => {
  const { productID, quantity } = req.body;

  if (!productID || !quantity) {
    return res
      .status(400)
      .json({ message: "Product ID and quantity are required." });
  }

  try {
    // Ensure stock is updated only if sufficient quantity exists
    const inventory = await InventoryService.read(productID, "productID");
    if (!inventory) {
      return res
        .status(404)
        .json({ message: "Product not found in inventory." });
    }

    if (inventory.stockQty < quantity) {
      return res.status(400).json({
        message: `Insufficient stock. Available: ${inventory.stockQty}`,
      });
    }

    const newStockQty = inventory.stockQty - quantity;
    if (newStockQty === 0) {
      //Get product
      const getProduct = await ProductService.read(productID, "productID");
      getProduct.active = 0;
      console.log("getProduct!!");

      await ProductService.update(productID, { active: 0 }, "productID");
    }

    const changeDate = dayjs().format("YYYY-MM-DD HH:mm:ss");

    await InventoryService.update(
      inventory.inventoryID,
      { stockQty: newStockQty, changeDate },
      "inventoryID"
    );

    return res.status(200).json({
      message: "Stock updated successfully.",
      productID,
      newStockQty,
    });
  } catch (error) {
    console.error("Error updating inventory stock:", error);
    return res.status(500).json({ message: "Failed to update stock." });
  }
};

module.exports = {
  getAllInventory,
  createInventory,
  getInventory,
  updateInventory,
  deleteInventory,
  updateInventoryStock,
};
