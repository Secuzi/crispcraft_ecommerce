const express = require("express");

const dotenv = require("dotenv").config();
const customerRoutes = require("./routes/CustomerRoutes");
const app = express();
const PORT = process.env.PORT || 3000;
// dbConnection();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/customers", customerRoutes);

app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));
