const customerService = require("../services/CustomerService");

//@path GET /customers
const getAllCustomers = async (req, res) => {
  const customers = await customerService.getAll();
  res.send({ customers });
};

//@path GET /customers/:id
const getCustomer = async (req, res) => {
  const id = Number(req.params.id);
  const customer = await customerService.read(id, "customerID");

  if (!customer) {
    return res.status(400).send("Cannot find User");
  }
  return res.status(200).json({ customer });
};

//@path POST /customers

const createCustomer = async (req, res) => {
  try {
    const newCustomer = await customerService.create(req.body);
    //JOI validation
    if (!newCustomer) {
      res.status(400).send({ message: "Could not create customer" });
    }
    res.status(201).send({ newCustomer });
  } catch (e) {
    console.log(e);
  }
};

//@path DELETE /customers/:id

const deleteCustomer = async (req, res) => {
  const customer_id = Number(req.params.id);

  const output = await customerService.delete(customer_id, "customerID");
  res.send({ output });
};

module.exports = {
  getAllCustomers,
  getCustomer,
  createCustomer,
  deleteCustomer,
};
