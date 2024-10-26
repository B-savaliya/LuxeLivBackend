import express from "express";
import connectDB, { PORT } from "./config/db.config.js";
import userRouter from "./routes/user.routes.js";

const app = express();

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/user", userRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});