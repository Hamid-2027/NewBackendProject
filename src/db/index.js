import mongoose from "mongoose";
import dotenv from "dotenv";
import { DB_NAME } from "../constant.js";


dotenv.config();

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`, {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
      family: 4  // Force IPv4
    });

    console.log(`\n MongoDB connected! DB HOST: ${connectionInstance.connection.host}`);
  } catch (error) {
    console.error("MONGODB CONNECTION ERROR:", error);
    process.exit(1);
  }
};

export default connectDB;
