const express = require("express");
const app = express();
const users = require("./routes/users");
const notFound = require("./middleware/not-found");

const connectDB = require("./DB/connect");
require("dotenv").config();

// middleware
// we need to do this, inorder to get the data from 'req.body'
app.use(express.json());

// routes
app.use("/api/v1/users", users);
app.use(notFound);
// app.all("*", (req, res) => {
//   res.status(404).send("<h1>resource not found</h1>");
// });

const start = async () => {
  // only running the server if connection to database is established
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