const OrderService = require("../services/OrderService");
const orderSchema = require("../schemas/OrderSchema");
const dayjs = require("dayjs");
const getAllOrders = async (req, res) => {
  try {
    const orders = await OrderService.getAll();
    res.send({ orders });
  } catch (e) {
    console.log(e);
  }
};
const createOrder = async (req, res) => {
  try {
    let { orderDate, orderItemID, customerID } = req.body;
    orderDate = dayjs().format("YYYY-MM-DD HH:mm:ss");
    const { error, value: validatedOrder } = orderSchema.validate(
      {
        orderDate,
        orderItemID,
        customerID,
      },
      { abortEarly: false }
    );

    console.log("VALIDATED ORDEER: ", validatedOrder.orderDate);
    if (error) {
      const errorMessages = error.details.map((detail) => detail.message);

      console.log(errorMessages);
      return res.status(400).json({ message: errorMessages });
    }
    const createdOrder = await OrderService.create(validatedOrder);
    console.log("CREATED ORDEER:", createdOrder);
    return res.status(200).json({
      message: "Created Order!",
      orderItemID: createdOrder.id,
    });
  } catch (e) {
    console.log(e);
  }
};

const updateOrder = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { orderDate, orderItemID, customerID } = req.body;
    const searchedOrderItem = await OrderService.read(id, "orderID");

    if (!searchedOrderItem) {
      return res.status(400).json({ message: "Order does not exist!" });
    }
    orderDate = dayjs().format("YYYY-MM-DD HH:mm:ss");
    const { error, value: validatedOrder } = orderSchema.validate(
      {
        orderDate,
        orderItemID,
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
    const updatedOrder = await OrderService.update(
      id,
      validatedOrder,
      "orderID"
    );

    return res
      .status(200)
      .json({ message: "Updated successfully!", updatedOrder });
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  getAllOrders,
  createOrder,
  updateOrder,
};
