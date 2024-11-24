const {mongoose} = require('./db');

const Schema = mongoose.Schema

const RegistrationSchema = new Schema({
    username: {type:String, required:true},
    password: {type:String, required:true},
    address: {type:String },
    email: {type:String },
    phonenumber: {type:String },
});

const RegistrationModel = mongoose.model('Registration', RegistrationSchema);


module.exports = {RegistrationModel};
