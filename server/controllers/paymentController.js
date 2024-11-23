const PaymentService = require("../services/PaymentService");
const paymentSchema = require("../schemas/PaymentSchema");
//@PATH /payment
const createPayment = async (req, res) => {
  try {
    let { paymentMethod, orderID } = req.body;

    const { error, value: validatedPayment } = paymentSchema.validate(
      {
        paymentMethod,
        orderID,
      },
      { abortEarly: false }
    );

    console.log("VALIDATED ORDEER: ", validatedPayment.orderDate);
    if (error) {
      const errorMessages = error.details.map((detail) => detail.message);

      console.log(errorMessages);
      return res.status(400).json({ message: errorMessages });
    }
    const createdPayment = await PaymentService.create(validatedPayment);
    console.log("CREATED Payment:", createdPayment);
    return res.status(200).json({
      message: "Created Order!",
      orderItemID: createdPayment.id,
    });
  } catch (e) {
    console.log(e);
  }
};

const getPaymentByOrderID = async (req, res) => {
  try {
    const orderID = req.params.id;
    if (!orderID) {
      return res.status(400).json({ message: "Order does not exist!" });
    }
    const payment = await PaymentService.getByField("orderID", orderID);

    return res.status(200).json(payment);
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  createPayment,
  getPaymentByOrderID,
};
