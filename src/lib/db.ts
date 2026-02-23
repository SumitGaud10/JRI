import mongoose, { MongooseError } from "mongoose";
import config from "../config/config.js";

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(config.mongoUri);
    console.log("Database Connected!");
    return connection;
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

export default connectDB;
