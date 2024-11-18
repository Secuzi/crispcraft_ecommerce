if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const path = require("path");
const express = require("express");
const cors = require("cors");
const flavorRoutes = require("./routes/FlavorRoutes");
const customerRoutes = require("./routes/CustomerRoutes");
const productRoutes = require("./routes/ProductRoutes");
const session = require("express-session");
const authRoutes = require("./routes/authRoutes");
const inventoryRoutes = require("./routes/InventoryRoutes");
const queryRoutes = require("./routes/queryRoutes");
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
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/auth", authRoutes);
app.use("/customers", customerRoutes);
app.use("/products", productRoutes);
app.use("/flavors", flavorRoutes);
app.use("/inventory", inventoryRoutes);
app.use("/query", queryRoutes);

app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));
