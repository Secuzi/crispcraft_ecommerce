const cartItemSchema = require("../schemas/CartItemSchema");
const CartItemService = require("../services/CartItemService");

//@PATH: /cart-item
const getAllCartItems = async (req, res) => {
  try {
    const cartItems = await CartItemService.getAll();

    return res.status(200).json(cartItems);
  } catch (e) {
    console.log(e);
  }
};

//@PATH: /cart-item
const getCartItemsByCustomerID = async (req, res) => {
  try {
    const customerID = req.params.id;
    if (!customerID) {
      return res.status(400).json({ message: "User does not exist!" });
    }
    const cartItems = await CartItemService.findCartItemsByCustomerID(
      customerID
    );

    return res.status(200).json(cartItems);
  } catch (e) {
    console.log(e);
  }
};

//@PATH: /cart-item
const createCartItem = async (req, res) => {
  try {
    const { quantity, productID, customerID } = req.body;

    const { error, value: validatedCartItem } = cartItemSchema.validate(
      {
        quantity,
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
    const createdCartItem = await CartItemService.create(validatedCartItem);

    return res.status(200).json({
      message: "Created Cart Item!",
      cartItemID: createdCartItem.id,
    });
  } catch (e) {
    console.log(e);
  }
};

const updateCartItem = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { quantity, productID, customerID } = req.body;
    const searchedCartItem = await CartItemService.read(id, "cartItemID");

    if (!searchedCartItem) {
      return res.status(400).json({ message: "Cart Item does not exist!" });
    }

    const { error, value: validatedCartItem } = cartItemSchema.validate(
      {
        quantity,
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
    const updatedCartItem = await CartItemService.update(
      id,
      validatedCartItem,
      "cartItemID"
    );

    return res
      .status(200)
      .json({ message: "Updated successfully!", updatedCartItem });
  } catch (e) {
    console.log(e);
  }
};

const deleteCartItem = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const searchedCartItem = await CartItemService.read(id, "cartItemID");

    if (!searchedCartItem) {
      return res.status(400).json({ message: "Cart Item does not exist!" });
    }
    const deleted = await CartItemService.delete(id, "cartItemID");
    res.status(200).json(deleted);
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  createCartItem,
  updateCartItem,
  getAllCartItems,
  deleteCartItem,
  getCartItemsByCustomerID,
};
