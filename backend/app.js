require("dotenv").config();
require("express-async-errors");
const express = require("express");
const app = express();
const cookieParser = require('cookie-parser');
const cors = require('cors');
const multer = require('multer');
const path = require('path');

// Cross origin resource sharing
const whitelist = ["http://localhost:3000"];
const corsOptions = {
  origin: (origin, callback) => {
    // if domain is in whitelist
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      // no error, allowed
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

// DB connection
const connectDB = require("./DB/connect");

const authenticateUser = require("./middleware/authentication"); // login
const checkAdmin = require("./middleware/adminAuth");

// routers
const authRouter = require("./routes/auth");
const userRouter = require("./routes/users");
const adminRouter = require("./routes/admin");
const postRouter = require("./routes/posts");
const refreshRouter = require("./routes/refresh");
const logoutRouter = require("./routes/logout");
const notificationRouter = require("./routes/notification");
const emailRouter = require("./routes/email");

// error handler
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

app.use("/images", express.static(path.join(__dirname, "public/images"))); // path for images

app.use(express.json()); // required inorder to get the data from 'req.body'
app.use(cookieParser());

// image storing logic
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    // cb(null, file.originalname); // for postman testing
    cb(null, req.body.name); // for react
  }
})  

const upload = multer({storage});
app.post("/api/v1/upload", upload.single("file"), (req, res) => {
  try {
    return res.status(200).json("File uploaded successfully")
  } catch (error) {
    console.log(error);
  }
})

// routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/refresh", refreshRouter);
app.use("/api/v1/logout", logoutRouter);
app.use("/api/v1/admin", authenticateUser, checkAdmin, adminRouter);
app.use("/api/v1/users", authenticateUser, userRouter);
app.use("/api/v1/post", authenticateUser, postRouter);
app.use("/api/v1/notification", authenticateUser, notificationRouter);
app.use("/api/v1/email", authenticateUser, emailRouter);

// temporary logic to create admin
const { createAdmin } = require("./controller/admin");
app.post("/api/v1/create-admin", createAdmin);

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
