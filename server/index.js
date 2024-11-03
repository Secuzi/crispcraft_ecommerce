const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv").config();
const customerRoutes = require("./routes/CustomerRoutes");
const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/customers", customerRoutes);

app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));
