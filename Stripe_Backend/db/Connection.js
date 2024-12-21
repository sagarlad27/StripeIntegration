import mongoose from "mongoose";
const ConnectionString =
  process.env.MONGO_URI ||
  "mongodb+srv://sagarlad271297:YhCEOtOSEAHv6FjQ@stripe.lxw9c.mongodb.net/Stripe";
const connectDB = async () => {
  try {
    const conection= await mongoose.connect(ConnectionString);
    console.log("MongoDB connected..."+conection.connection.host+", "+conection.connection.name+", "+conection.connection.port);
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
};

export default connectDB;
