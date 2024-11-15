const express = require("express");
const bycrypt = require("bcrypt");
const CustomerService = require("../services/CustomerService");
const router = express.Router();

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await CustomerService.getByField("email", email);
  //If user doesn't exist then
  if (!user) {
    return res.json({ message: "Invalid email or password" });
  }
  const validPassword = await bycrypt.compare(password, user.password);

  if (!validPassword) {
    return res.json({ message: "Invalid email or password" });
  }

  req.session.costumer = { user_id: user.costumerID, role: user.role };
  res.send(req.session.costumer);
});

module.exports = router;
