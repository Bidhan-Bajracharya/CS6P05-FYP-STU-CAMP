require("dotenv").config();
require("express-async-errors");
const express = require("express");
const app = express();

// DB connection
const connectDB = require("./DB/connect");

// routers
const auth = require("./routes/auth");
const users = require("./routes/users");

// error handler
const notFoundMiddleware = require("./middleware/not-found");

app.use(express.json()); // required inorder to get the data from 'req.body'

// routes
app.use("/api/v1/auth", auth);
app.use("/api/v1/users", users);

app.use(notFoundMiddleware);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen("5000", () => {
      console.log("Server is listening on port 5000...");
    });
  } catch (error) {
    console.log(error);
  }
};

start();
