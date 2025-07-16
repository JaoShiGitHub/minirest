import bodyParser from "body-parser";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import authRouter from "./controllers/auth.js";
import menu from "./routers/menu_routers.js";
import customer from "./routers/customer_routers.js";
import admin from "./routers/admin_routers.js";
import order from "./routers/order_routers.js";
import { editCustomerInfo } from "./controllers/customers.js";

const app = express();
dotenv.config();

app.use(cors());
app.use(bodyParser.json());
app.use("/auth", authRouter); // Login
app.use("/menu", menu);
app.use("/customer", customer);
app.use("/order", order);
app.put("/edit-customer-info", editCustomerInfo);

app.listen(4000, () => {
  console.log("Server is listening at port 4000");
});
