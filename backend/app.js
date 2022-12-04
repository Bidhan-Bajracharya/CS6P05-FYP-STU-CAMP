require("dotenv").config();
require("express-async-errors");
const express = require("express");
const app = express();

// DB connection
const connectDB = require("./DB/connect");

const authenticateUser = require('./middleware/authentication')
const checkAdmin = require('./middleware/adminAuth')

// routers
const authRouter = require("./routes/auth");
const userRouter = require("./routes/users");
const adminRouter = require("./routes/admin");
const postRouter = require("./routes/posts");

// error handler
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

app.use(express.json()); // required inorder to get the data from 'req.body'

// routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/admin", authenticateUser, checkAdmin, adminRouter);
app.use("/api/v1/users", authenticateUser, userRouter);
app.use("/api/v1/post", authenticateUser, postRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

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
