const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv").config();
const customerRoutes = require("./routes/CustomerRoutes");
const session = require("express-session");
const authRoutes = require("./routes/authRoutes");
const app = express();
const PORT = process.env.PORT || 3000;
app.use(
  cors({
    origin: "http://localhost:4000",
    credentials: true,
  })
);

app.use(
  session({
    secret: "puttodotenv",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/auth", authRoutes);
app.use("/customers", customerRoutes);

app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));
