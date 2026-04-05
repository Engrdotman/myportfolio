require("dotenv").config();
const express = require("express");
const cors = require("cors");

const contactRoutes = require("./routes/contactRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", contactRoutes);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});