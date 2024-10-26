import mongoose from "mongoose";
import dotenv from "dotenv/config";

const PORT = process.env.PORT || 9009;
const MONGO_URI = process.env.MONGO_URI;
const MAIL_USER = process.env.MAIL_USER;
const MAIL_PASSWORD = process.env.MAIL_PASSWORD;
const MAIL_FROM = process.env.MAIL_FROM;

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log(error);
  }
};

export default connectDB;

export { PORT, MONGO_URI, MAIL_USER, MAIL_PASSWORD, MAIL_FROM };