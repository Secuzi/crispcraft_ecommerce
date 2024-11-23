const DeliveryService = require("../services/DeliveryService");
const deliverySchema = require("../schemas/DeliverySchema");

const getAllDeliveries = async (req, res) => {
  try {
    const deliveries = await DeliveryService.getAll();
    res.send({ deliveries });
  } catch (e) {
    console.log(e);
  }
};

const createDelivery = async (req, res) => {
  try {
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

    console.log("VALIDATED DELIVERY: ", validatedDelivery.orderDate);
    if (error) {
      const errorMessages = error.details.map((detail) => detail.message);

      console.log(errorMessages);
      return res.status(400).json({ message: errorMessages });
    }

    const createdDelivery = await DeliveryService.create(validatedDelivery);

    return res.status(200).json({
      message: "Created Order!",
      orderID: createdOrder.id,
    });
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  getAllDeliveries,
  createDelivery,
};
