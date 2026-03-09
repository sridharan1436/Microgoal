const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const errorMiddleware = require("./Middlewares/errormiddleware");

const authRoute = require("./Router/AuthRouter");
const goalRouter = require("./Router/GoalRouter");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3000;
const Mongo_Url = process.env.MONGO_URL;

// MongoDB connection
mongoose
  .connect(Mongo_Url)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// Routes
app.use("/auth", authRoute);
app.use("/goal", goalRouter);

app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});