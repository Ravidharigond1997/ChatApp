import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

// Importing routing for perticulor routes
import userRouter from "./routes/userRoutes.js";

const app = express();

// configuration env
dotenv.config();

app.use(cors());
app.use(express.json());

app.use("/api/auth", userRouter);

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB connected successfully");
  })
  .catch((err) => {
    console.log("Erroe" + err.message);
  });

const port = process.env.PORT || 8085;

const server = app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
