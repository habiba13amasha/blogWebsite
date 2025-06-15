import express from "express";
import dotenv from "dotenv";
dotenv.config();

import cookieParser from "cookie-parser";
import cors from "cors";
import { connectDB } from "./dbConfig.js";
import userRoutes from "./routes/userRoutes.js";
import postRoutes from "./routes/postRoutes.js";

const app = express();

// Middleware
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

// Routes

app.use("/users", userRoutes);
app.use("/posts", postRoutes);

// Database connection

connectDB();

//start server
app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
