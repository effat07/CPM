const express = require("express");
const cors = require("cors");
const { connectDB } = require("./config/db");
require("dotenv").config();

const authRoutes = require("./routes/auth");
const customerRoutes = require("./routes/customerRoutes");
const productRoutes = require("./routes/products");
const categoryRoutes = require("./routes/category");
const forgotPasswordRoutes = require("./routes/forgotPassword");
const resetPasswordRoute = require("./routes/resetPassword");
const siteSettingsRoutes = require("./routes/siteSettingsRoutes");

const app = express();
app.use(cors());
app.use(express.json());


app.use("/api/auth", authRoutes);
app.use("/api/customers", customerRoutes);
app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/forgot-password", forgotPasswordRoutes);
app.use("/api/reset-password", resetPasswordRoute);
app.use("/api/settings", siteSettingsRoutes);


app.get("/", (req, res) => {
  res.send("API is running");
});


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

const PORT = process.env.PORT || 5000;


if (!process.env.MONGO_URI) {
  console.error("MONGO_URI is not defined in .env");
  process.exit(1);
}

connectDB().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
