import express, { Application } from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import router from "./routes";

dotenv.config();

const app: Application = express();
const PORT: string | number = process.env.PORT || 8000;
const MONGODB_URI: string = process.env.MONGODB_URI || "";

app.use(cors());
app.use(express.json());
app.use("/api", router);

mongoose
  .connect(MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(`Error connecting to MongoDB: ${err}`));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
