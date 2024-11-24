const mongoose = require('mongoose');
const dbUrl = 'mongodb+srv://mentorguvi:AsG5HtQYGlXeB4m4@cluster0.jdnk5.mongodb.net/';

const connectDb = async () => {
  if(!(mongoose.connection.readyState === 1)) {
     await mongoose.connect(dbUrl);
  }
  console.log(mongoose.connection.readyState,'mongoose.connection.readyState');
}

module.exports = {connectDb,mongoose};