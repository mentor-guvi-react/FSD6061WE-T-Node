const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const { connectDb } = require("./db");
const { RegistrationModel } = require("./Schema");

app.use(bodyParser.json());
app.use(cors());

connectDb();

app.get("/health", (req, res) => {
  res.send("Server is running");
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const dbresponse = await RegistrationModel.findOne({ username, password });
    console.log(dbresponse, "dbresponse dbresponse");
    if (dbresponse._id) {
      res.send("login success");
    }
  } catch (error) {
    console.log(error, "error in login");
    res.send("logine failed");
  }
});

app.post("/register", async (req, res) => {
  try {
    const dbResponse = await RegistrationModel.create({
      username: req.body.username,
      password: req.body.password,
      address: req.body.address,
      email: req.body.email,
      phonenumber: req.body.phonenumber,
    });
    console.log(dbResponse, "dbResponse in register");
    if (dbResponse._id) {
      console.log(dbResponse, "dbResponse", dbResponse.username);
      res.send(req.body.username);
    }
  } catch (error) {
    console.log(error, "Error in register");
    res.send("register failed");
  }
});

app.post("/create-booking", () => {
  res.send("Booking created");
});

app.listen(4000, () => {
  console.log("server is running on port 4000");
});
