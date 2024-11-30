const {mongoose} = require('./db');

const Schema = mongoose.Schema

const RegistrationSchema = new Schema({
    username: {type:String, required:true},
    password: {type:String, required:true},
    address: {type:String },
    email: {type:String },
    phonenumber: {type:String },
});

const BookingSchema = new Schema({
    hotelId: {type:String, required:true},
    selectedDate: {type:String, required:true},
    selectedSeats: {type:String, required:true},
    selectedTime: {type:String, required:true},
    username: {type:String, required:true},
    isCancelled: {type:Boolean, default:false},
})


const RegistrationModel = mongoose.model('Registration', RegistrationSchema);
const BookingModel = mongoose.model('Booking', BookingSchema);


module.exports = {RegistrationModel,BookingModel};
