import express from "express";
import mongoose from "mongoose";
import authRoutes from "./Controllers/UserRoutes.js";
import userPickRoutes from "./Controllers/UserPickRoutes.js"
import hotelroute from "./Controllers/HotelRoute.js"
import AiPlanner from "./Controllers/AIPlanner.js"
import placeroute from "./Controllers/PlacesRoute.js"
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const PORT = process.env.PORT;
const DB_connection = process.env.MONGO_URI;

const app = express();
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

mongoose
  .connect(DB_connection)
  .then(() => console.log("Database Connected Successfully"))
  .catch((err) => console.log("Database Connection Failed:", err));

app.use("/api/auth/users", authRoutes);
app.use("/api/picks", userPickRoutes);
app.use("/api/auth/hotels", hotelroute)
app.use("/api", AiPlanner)
app.use("/api/places",placeroute)

app.listen(PORT, () => console.log("Server is running on port", PORT));
