import bodyParser from "body-parser";
import express from "express";
import dotenv from "dotenv";

import authRouter from "./apps/auth.js";
import menu from "./apps/menu_routers.js";
import customer from "./apps/customer_routers.js";

const app = express();
dotenv.config();

app.use(bodyParser.json());
app.use("/auth", authRouter);
app.use("/menu", menu);
app.use("/customer", customer);

app.listen(4000, () => {
  console.log("Server is listening at port 4000");
});
