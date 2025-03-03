import bodyParser from "body-parser";
import express from "express";
import authRouter from "./apps/auth.js";
import { getMenu } from "./controllers/menu.js";
import dotenv from "dotenv";

const app = express();
dotenv.config();

app.use(bodyParser.json());
app.use("/auth", authRouter);
app.get("/menu", getMenu);

app.listen(4000, () => {
  console.log("Server is listening at port 4000");
});
