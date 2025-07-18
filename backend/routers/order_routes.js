import { Router } from "express";
import { orderHistory } from "../controllers/order.js";
import authUser from "../middlewares/auth.js";

const order = Router();

order.get("/history", authUser, orderHistory);

export default order;
