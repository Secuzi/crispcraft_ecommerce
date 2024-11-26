const DeliveryService = require("../services/DeliveryService");
const deliverySchema = require("../schemas/DeliverySchema");
const { poolPromise, sql } = require("../connections/dbConnection");
const dayjs = require("dayjs");
const InventoryService = require("../services/InventoryService");
const OrderItemService = require("../services/OrderItemService");

const getAllDeliveries = async (req, res) => {
  try {
    const deliveries = await DeliveryService.getAll();
    res.send({ deliveries });
  } catch (e) {
    console.log(e);
  }
};
//@PATH /delivery
const createDelivery = async (req, res) => {
  try {
    let {
      deliveryDate,
      cashCollected,
      deliveryStatus,
      orderID,
      merchantID,
      deliveryAddress,
    } = req.body;
    deliveryDate = dayjs().format("YYYY-MM-DD HH:mm:ss");
    const { error, value: validatedDelivery } = deliverySchema.validate(
      {
        deliveryDate,
        cashCollected,
        deliveryStatus,
        orderID,
        deliveryAddress,
        merchantID,
      },
      { abortEarly: false }
    );

    if (error) {
      const errorMessages = error.details.map((detail) => detail.message);

      console.log(errorMessages);
      return res.status(400).json({ message: errorMessages });
    }

    const createdDelivery = await DeliveryService.create(validatedDelivery);
    console.log("CREATED DELIVERYYY!", createdDelivery);
    return res.status(200).json({
      message: "Created Delivery!",
      deliveryID: createdDelivery.id,
    });
  } catch (e) {
    console.log(e);
  }
};

//@path GET /delivery/:id
const getDelivery = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const delivery = await DeliveryService.read(id, "deliveryID");

    if (!delivery) {
      return res.status(400).send("Cannot find Delivery");
    }
    return res.status(200).json({ delivery });
  } catch (e) {
    console.log(e);
  }
};

const updateDelivery = async (req, res) => {
  try {
    const { id } = req.params;
    const { deliveryDate, cashCollected, deliveryStatus, orderID, merchantID } =
      req.body;
    const { error, value: validatedDelivery } = deliverySchema.validate(
      {
        deliveryDate,
        cashCollected,
        deliveryStatus,
        orderID,
        merchantID,
      },
      { abortEarly: false }
    );

    if (error) {
      const errorMessages = error.details.map((detail) => detail.message);

      console.log(errorMessages);
      return res.status(400).json({ message: errorMessages });
    }
    const updatedDelivery = await DeliveryService.update(
      id,
      validatedDelivery,
      "deliveryID"
    );
    return res
      .status(200)
      .json({ message: "Updated successfully!", updatedDelivery });
  } catch (e) {
    console.log(e);
  }
};
const getDeliveryByOrderID = async (req, res) => {
  try {
    const orderID = req.params.id;
    if (!orderID) {
      return res.status(400).json({ message: "Order does not exist!" });
    }
    const delivery = await DeliveryService.getByField("orderID", orderID);

    return res.status(200).json(delivery);
  } catch (e) {
    console.log(e);
  }
};

const returnProductToInventory = async (req, res) => {
  const { deliveryID, reason } = req.body;

  try {
    // Get a connection from the pool
    const pool = await poolPromise;

    // Fetch the delivery details using deliveryID
    const deliveryResult = await pool
      .request()
      .input("deliveryID", sql.Int, deliveryID)
      .query("SELECT * FROM delivery WHERE deliveryID = @deliveryID");

    if (deliveryResult.recordset.length === 0) {
      return res.status(404).json({ message: "Delivery not found." });
    }

    const { orderID } = deliveryResult.recordset[0];

    // Fetch all order items associated with the orderID
    const orderItemsResult = await pool
      .request()
      .input("orderID", sql.Int, orderID)
      .query("SELECT * FROM orderitem WHERE orderID = @orderID");

    if (orderItemsResult.recordset.length === 0) {
      return res.status(404).json({ message: "Order items not found." });
    }

    console.log("ITEM RESULT: ", orderItemsResult);

    // Iterate over order items to return products to inventory
    for (const orderItem of orderItemsResult.recordset) {
      const { productID, quantity } = orderItem;

      // Fetch the inventory record
      const inventoryResult = await pool
        .request()
        .input("productID", sql.Int, productID)
        .query("SELECT * FROM inventory WHERE productID = @productID");

      if (inventoryResult.recordset.length === 0) {
        return res.status(404).json({
          message: `Product with ID ${productID} not found in inventory.`,
        });
      }

      const inventory = inventoryResult.recordset[0];

      // Increment the stock quantity
      const newStockQty = inventory.stockQty + quantity;
      const changeDate = dayjs().format("YYYY-MM-DD HH:mm:ss");

      // Update the inventory
      await pool
        .request()
        .input("newStockQty", sql.Int, newStockQty)
        .input("changeDate", sql.VarChar, changeDate)
        .input("inventoryID", sql.Int, inventory.inventoryID)
        .query(
          "UPDATE inventory SET stockQty = @newStockQty, changeDate = @changeDate WHERE inventoryID = @inventoryID"
        );
    }

    // Update delivery status and cancellation reason
    await pool
      .request()
      .input("deliveryStatus", sql.VarChar, "cancelled")
      .input("reason", sql.VarChar, reason)
      .input("deliveryID", sql.Int, deliveryID)
      .query(
        "UPDATE delivery SET deliveryStatus = @deliveryStatus, reason = @reason WHERE deliveryID = @deliveryID"
      );

    return res.status(200).json({
      message: "Products returned to inventory successfully.",
    });
  } catch (error) {
    console.error("Error returning products to inventory:", error);
    return res
      .status(500)
      .json({ message: "Failed to return products to inventory." });
  }
};
module.exports = {
  getAllDeliveries,
  createDelivery,
  getDelivery,
  updateDelivery,
  getDeliveryByOrderID,
  returnProductToInventory,
};
