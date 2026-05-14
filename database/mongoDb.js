// database/mongoDb.js
import mongoose from "mongoose";

const connectDb = async () => {
  try {
    // This MUST match the key name you set in Render Dashboard
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Database Connection Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDb;
