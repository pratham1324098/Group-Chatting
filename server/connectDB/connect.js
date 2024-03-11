const mongoose = require("mongoose");

const connectDB = async (url) => {
  try {
    await mongoose.connect(url);
    console.log("Connected to DB");
  } catch (error) {
    console.log("Couldn't connect to db");
  }
};

module.exports = connectDB;
