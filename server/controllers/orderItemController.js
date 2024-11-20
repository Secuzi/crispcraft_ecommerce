const OrderItemService = require("../services/OrderItemService");
const orderItemSchema = require("../schemas/OrderItemSchema.js");
const getAllOrderItems = async (req, res) => {
  try {
    const orderItems = await OrderItemService.getAll();
    return res.status(200).json(orderItems);
  } catch (e) {
    console.log(e);
  }
};

const createOrderItem = async (req, res) => {
  try {
    const { quantity, subtotal, productID, customerID } = req.body;

    const { error, value: validatedOrderItem } = orderItemSchema.validate(
      {
        quantity,
        subtotal,
        productID,
        customerID,
      },
      { abortEarly: false }
    );

    //Assuming productID and customerID are always valid

    if (error) {
      const errorMessages = error.details.map((detail) => detail.message);

      console.log(errorMessages);
      return res.status(400).json({ message: errorMessages });
    }
    const createdOrderItem = await OrderItemService.create(validatedOrderItem);

    return res.status(200).json({
      message: "Created Order Item!",
      orderItemID: createdOrderItem.orderItemID,
    });
  } catch (e) {
    console.log(e);
  }
};

const updateOrderItem = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { quantity, subtotal, productID, customerID } = req.body;
    const searchedOrderItem = await OrderItemService.read(id, "orderItemID");

    if (!searchedOrderItem) {
      return res.status(400).json({ message: "Order Item does not exist!" });
    }

    const { error, value: validatedOrderItem } = orderItemSchema.validate(
      {
        quantity,
        subtotal,
        productID,
        customerID,
      },
      { abortEarly: false }
    );

    //Assuming productID and customerID are always valid

    if (error) {
      const errorMessages = error.details.map((detail) => detail.message);

      console.log(errorMessages);
      return res.status(400).json({ message: errorMessages });
    }
    const updatedOrderItem = await OrderItemService.update(
      id,
      validatedOrderItem,
      "orderItemID"
    );

    return res
      .status(200)
      .json({ message: "Updated successfully!", updatedOrderItem });
  } catch (e) {
    console.log(e);
  }
};

const deleteOrderItem = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const searchedOrderItem = await OrderItemService.read(id, "orderItemID");

    if (!searchedOrderItem) {
      return res.status(400).json({ message: "Order Item does not exist!" });
    }
    const deleted = await OrderItemService.delete(id, "orderItemID");
    res.status(200).json(deleted);
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  getAllOrderItems,
  createOrderItem,
  updateOrderItem,
  deleteOrderItem,
};
