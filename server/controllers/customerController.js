const CustomerService = require("../services/CustomerService");
const bycrypt = require("bcrypt");
const customerSchema = require("../schemas/CustomerSchema");
//@path GET /customers
const getAllCustomers = async (req, res) => {
  const customers = await CustomerService.getAll();
  res.send({ customers });
};

//@path GET /customers/:id
const getCustomer = async (req, res) => {
  const id = Number(req.params.id);
  const customer = await CustomerService.read(id, "customerID");

  if (!customer) {
    return res.status(400).send("Cannot find User");
  }
  return res.status(200).json({ customer });
};

//@path POST /customers

const createCustomer = async (req, res) => {
  try {
    //Naay bug diri katong confirm password, use joi or something fuck
    const {
      email,
      password,
      address,
      phoneNum,
      fName,
      lName,
      city,
      state,
      role = "customer",
    } = req.body;

    const { error, value: validatedCustomer } = customerSchema.validate({
      email,
      password,
      address,
      phoneNum,
      fName,
      lName,
      city,
      state,
      role,
    });

    if (error) {
      const errorMessages = error.details.map((detail) => detail.message);
      return res.status(400).json({ message: errorMessages });
    }

    console.log(validatedCustomer);
    const hashedPassword = await bycrypt.hash(password, 10);
    validatedCustomer.password = hashedPassword;
    const newCustomer = await CustomerService.create(validatedCustomer);

    if (!newCustomer) {
      return res.status(400).send({ message: "Could not create customer" });
    }
    res.status(201).send({ newCustomer });
  } catch (e) {
    console.log(e);
  }
};

//@path DELETE /customers/:id

const deleteCustomer = async (req, res) => {
  const customer_id = Number(req.params.id);
  console.log(req.session.user);
  //Find if user exists
  const customer = await CustomerService.read(customer_id, "customerID");
  if (!customer) {
    return res.status(404).json({ message: "Account not found!" });
  }
  const output = await CustomerService.delete(customer_id, "customerID");
  res.send({ output });
};

//@path PUT /customers/:id
const updateCustomer = async (req, res) => {
  const customer_id = Number(req.params.id);
  const data = { ...req.body };
  const output = await CustomerService.update(customer_id, data, "customerID");

  res.send({ output });
};

module.exports = {
  getAllCustomers,
  getCustomer,
  createCustomer,
  deleteCustomer,
  updateCustomer,
};
