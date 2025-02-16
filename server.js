import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectWithDB from "./db.js";
import tokenRouter from "./routes/todoRoutes.js";
import { authorizationMiddleware } from "./middlewares/index.js";
const app = express();
dotenv.config();
app.use(express.json());
app.use(cors());
connectWithDB();
app.use("/todoapplication", authorizationMiddleware, tokenRouter);
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log("APP is running on : ", PORT);
});
