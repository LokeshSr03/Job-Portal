import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const con = await mongoose.connect(process.env.URI);
    console.log(`mongoDb connected Successfully at ${con.connection.host}`);
  } catch (error) {
    console.log(`mongoDb connected failed`);
  }
};

export default connectDB;
