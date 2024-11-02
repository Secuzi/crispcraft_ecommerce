const customers = [
  {
    customer_id: 1,
    fName: "Harold",
    lName: "Filomeno",
    address: "2263 yawa city",
    city: "Cebu city",
    state: "NA",
    phoneNum: "09765164743",
    email: "act.hvfilomeno@gmail.com",
  },
  {
    customer_id: 2,
    fName: "Howard",
    lName: "Devilleres",
    address: "2263 yawaan i city",
    city: "Talisay city",
    state: "stateless",
    phoneNum: "09765164666",
    email: "act.vhdevilleres@gmail.com",
  },
];

//@path GET /customers
const getAllCustomers = (req, res) => {
  res.send({ customers });
};

//@path GET /customers/:id
const getCustomer = (req, res) => {
  const id = Number(req.params.id);
  const user = customers.find((customer) => customer.customer_id === id);
  if (!user) {
    return res.send("Cannot find User");
  }
  return res.send({ user });
};

//@path POST /customers

const createCustomer = (req, res) => {
  const customer = { ...req.body };
  //JOI validation
  if (!customer) {
    res.send({ message: "Could not create customer" });
  }
  customers.push(customer);
  res.send({ customer });
};

//@path DELETE /customers/:id

const deleteCustomer = (req, res) => {
  const customer_id = Number(req.params.id);

  console.log(`Customer ID: ${customer_id}`);
  const deletedCustomersList = customers.filter(
    (customer) => Number(customer.customer_id) !== Number(customer_id)
  );

  res.send({ deletedCustomersList });
};

module.exports = {
  getAllCustomers,
  getCustomer,
  createCustomer,
  deleteCustomer,
};
