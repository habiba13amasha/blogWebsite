import express from "express";
import dotenv from "dotenv";
dotenv.config();
import helloRoute from './routes/hello.js';

import cookieParser from "cookie-parser";
import cors from "cors";
import { connectDB } from "./dbConfig.js";
import userRoutes from "./routes/userRoutes.js";
import postRoutes from "./routes/postRoutes.js";

const app = express();

// Middleware
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://blog-website-de4g-kqm4pwgkx-habibas-projects-2c481812.vercel.app"
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"]
  })
);
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});
app.use(express.json());
app.use(cookieParser());



// Routes
app.use('/api/hello', helloRoute);

app.use("/users", userRoutes);
app.use("/posts", postRoutes);

// Database connection
connectDB();

export default app;  // <-- replace app.listen() by this