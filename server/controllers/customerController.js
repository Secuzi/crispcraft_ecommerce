const CustomerService = require("../services/CustomerService");
const bcrypt = require("bcrypt");
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

//@path GET /customers/field
const getCustomerByField = async (req, res) => {
  const { email } = req.query;
  if (!email) {
    return res.status(400).send("Email is required");
  }

  console.log("Checking email:", email); // Log email received
  const customer = await CustomerService.getByField("email", email);

  if (!customer) {
    console.log("Email does not exist in the database.");
    return res.status(404).send({ exists: false });
  }
  console.log("Email already exists in the database.");
  return res.status(200).send({ exists: true });
};
//@path POST /customers

const createCustomer = async (req, res) => {
  try {
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

    // Check if email already exists
    const existingCustomer = await CustomerService.read(email, "email");
    if (existingCustomer) {
      return res.status(400).json({ message: "Email is already in use" });
    }

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

    const hashedPassword = await bcrypt.hash(password, 10);
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
  getCustomerByField,
};
