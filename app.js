const express = require("express");

const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const jwt = require("jsonwebtoken");
require("dotenv/config");

//Middlewares
app.use(cors());
app.use(bodyParser.json());
//Import Routes
const todosRoute = require("./routes/todos");
const authRoute = require("./routes/auth");

app.use("/todos", todosRoute);
app.use("/users", authRoute);
//ROUTES
app.get("/", (req, res) => {
  res.send("We are on home");
});

//Connect to DB
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true }, () => {
  console.log("connected to db");
});
//How do we start listening to the server
app.listen(9000);
