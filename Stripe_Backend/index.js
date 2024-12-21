import express from "express";
import "./loadEnvironment.js";
import orderRoutes from "./routes/orderRoutes.js"
import cors from "cors"
import connectDB from "./db/Connection.js";

const corsOptions = {
    origin: "*", // Replace with specific origin(s) for production
    methods: ["GET", "POST", "PUT", "DELETE","PATCH"], // Allowed HTTP methods
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "x-user-role", // Add any custom headers you expect in requests
    ],
  };
const app = express();

app.use(cors(corsOptions))
app.use(express.json());
connectDB();
app.use("/api/order",orderRoutes)
const port = process.env.PORT || 5000;
app.listen(port,()=>{
    console.log("Server is listening on port: "+ port);
})

