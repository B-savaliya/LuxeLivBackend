import express from "express";
import cors from "cors";
import connectDB, { PORT } from "./config/db.config.js";
import userRouter from "./routes/user.routes.js";
import dotenv from 'dotenv';

const app = express();

// Load environment variables
dotenv.config();

// Define CORS options
const corsOptions = {
  origin: process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(',') : '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  optionsSuccessStatus: 204,
};

connectDB();

// Add CORS middleware
app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/user", userRouter);

// For Vercel, we'll export the app instead of calling app.listen
export default app;

// Keep this for local development
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}
