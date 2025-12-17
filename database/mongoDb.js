import mongoose from "mongoose";

const connectDb = async () => {
  try {
    const uri = process.env.MONGO_URI;

    if (!uri) {
      throw new Error("MONGO_URI is not defined in your .env file");
    }

    const conn = await mongoose.connect(uri);
    console.log(`MongoDB Connected `);
  } catch (error) {
    console.error(`Database Connection Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDb;
