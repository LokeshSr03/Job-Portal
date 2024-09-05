import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import { notFound, errorHandler } from "./middlewares/errorMiddleware.js";
import userRoute from "./routes/userRoute.js";
import jobRoute from "./routes/jobRoutes.js";
import cors from "cors";

dotenv.config();
connectDB();
const app = express();

app.use(express.json());
app.use(cors());
app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use("/api/users", userRoute);
app.use("/api", jobRoute);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`server is running on Port Number ${PORT}`);
});
