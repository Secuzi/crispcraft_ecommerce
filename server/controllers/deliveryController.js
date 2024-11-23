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

    if (error) {
      const errorMessages = error.details.map((detail) => detail.message);

      console.log(errorMessages);
      return res.status(400).json({ message: errorMessages });
    }

    const createdDelivery = await DeliveryService.create(validatedDelivery);

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
module.exports = {
  getAllDeliveries,
  createDelivery,
  getDelivery,
  updateDelivery,
  getDeliveryByOrderID,
};
