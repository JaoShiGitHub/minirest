import { Router } from "express";
import { orderHistory } from "../controllers/order.js";

const order = Router();

order.get("/history", orderHistory);

export default order;
