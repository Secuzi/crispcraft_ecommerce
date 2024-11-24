const express = require("express");
const bcrypt = require("bcrypt");
const CustomerService = require("../services/CustomerService");
const MerchantService = require("../services/MerchantService");
const router = express.Router();

router.post("/login", async (req, res) => {
  try {
    const { email, password, role } = req.body;
    // Validate input
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    let user;
    switch (role) {
      case "customer":
        user = await CustomerService.getByField("email", email); // Fetch from "customers" table
        break;
      case "merchant":
        user = await MerchantService.getByField("email", email); // Fetch from "merchants" table
        break;
      case "admin":
        user = await AdminService.getByField("email", email); // Fetch from "admins" table
        break;
      default:
        return res.status(400).json({ message: "Invalid role specified." });
    }
    console.log("USEER:", user);

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Store in session
    req.session.user = { user_id: user.customerID, role: user.role };
    // Send only necessary data
    res.json({
      message: "Login successful",
      user: { user_id: user.customerID, role: user.role },
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Something went wrong. Please try again later." });
  }
});

router.get("/check-session", (req, res) => {
  if (req.session.user) {
    res.json({
      authenticated: true,
      user: req.session.user,
    });
  } else {
    res.json({ authenticated: false });
  }
});

router.post("/logout", (req, res) => {
  req.session.user = null;
  req.session.destroy((err) => {
    if (err) {
      res.status(500).json({ message: "Error logging out" });
    } else {
      res.json({ message: "Logged out!" });
    }
  });
});

module.exports = router;
