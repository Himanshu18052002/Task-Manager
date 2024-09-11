const mongoose = require("mongoose"); // Import the Mongoose library

const db = async () => {
  try {
    await mongoose.connect(process.env.CONNECTION_STRING); // Use the Mongoose library to connect
    console.log("Database connected succesfully");
  } catch (error) {
    console.error("An error occured while connecting to the database ", error);
  }
};

module.exports = db;
