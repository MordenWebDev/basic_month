require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const helmet = require("helmet");

const PORT = process.env.PORT || 3000;
const connectDB = require("./src/config/db");
const authRoutes = require("./src/routes/auth.routes");
const expensesRoutes = require("./src/routes/expenses.route");
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/expenses", expensesRoutes);

app.get("/", (req, res) => {
  res.status(200).json({ message: "server running" });
});

app.use((err, req, res, next) => {
console.error(err);
  res.status(500).json({ message: "some thing went wrong" });
});

connectDB();
app.listen(PORT, () => {
  console.log("server is running");
});
