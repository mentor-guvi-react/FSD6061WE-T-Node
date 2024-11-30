const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const { connectDb } = require("./db");
const { RegistrationModel,BookingModel } = require("./Schema");

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

app.post("/create-booking", async (req,res) => {
  const {hotelId,selectedDate, selectedSeats , selectedTime,username  } =   req.body;
  try {
  const dbResponse =   await BookingModel.create({
      hotelId,
      selectedDate,
      selectedSeats,
      selectedTime,
      username,
      isCancelled: false
    })
    console.log(dbResponse,'dbResponse');
    res.send("Booking created");
  } catch (error) {
    res.send('Booking failed');
  }
});


app.get('/bookingDetails/:username' ,  async(req,res) => {
  const {username} =  req.params
  try{
    const response =   await BookingModel.find({username});
    res.send(response);
  }
  catch(error){
    res.send('cant fetch booking details for '+ username)
  }
})


app.get('/getBookingSlots/:hotelId/:selectedDate', async(req,res) => {
  const {hotelId,selectedDate} =  req.params
  try{
     const dbresponse  =  await BookingModel.find({hotelId,selectedDate});
     res.send(dbresponse)
  } 
  catch(error){
    res.send('cant fetch booking slots for '+ hotelId)
  }
})


app.put('/cancelBooking/:bookingId', async(req,res) => {
  const {bookingId} = req.params;

  console.log(bookingId,'bookingId');

  const filter  = {_id : bookingId};
  const update  = {isCancelled : true};

  try {
   const dbresponse =  await BookingModel.findOneAndUpdate( filter , update );
    res.send('Booking cancelled');
    
  } catch (error) {
    
  }
})

app.listen(4000, () => {
  console.log("server is running on port 4000");
});
