require("dotenv").config();
require("express-async-errors");
const express = require("express");
const app = express();
const cookieParser = require('cookie-parser');

// DB connection
const connectDB = require("./DB/connect");

const authenticateUser = require('./middleware/authentication') // login
const checkAdmin = require('./middleware/adminAuth')

// routers
const authRouter = require("./routes/auth");
const userRouter = require("./routes/users");
const adminRouter = require("./routes/admin");
const postRouter = require("./routes/posts");
// const logOutRouter = require() 

// error handler
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

app.use(express.json()); // required inorder to get the data from 'req.body'
app.use(cookieParser());

// routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/admin", authenticateUser, checkAdmin, adminRouter);
app.use("/api/v1/users", authenticateUser, userRouter);
app.use("/api/v1/post", authenticateUser, postRouter);
// app.use("/api/v1/refresh", authenticateUser, );
// app.use("/api/v1/logout", authenticateUser, );

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
