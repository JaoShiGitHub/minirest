import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRouter from "./controllers/auth.js";

const app = express();
dotenv.config();

app.use(express.json()); // allows Express to read and understand JSON data sent in the body of a request.
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use("/auth", authRouter);

app.listen(4000, () => {
  console.log("Server is listening at port 4000");
});
