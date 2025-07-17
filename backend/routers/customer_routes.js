import { Router } from "express";
import {
  customerRegister,
  customerAddOrder,
  customerEditInfo,
  customerInfo,
  customerLogin,
} from "../controllers/customers.js";
import { validateRegisterCustomer } from "./customerValidation.js";
import authUser from "../middlewares/auth.js";

const customer = Router();

// POST
customer.post("/login", customerLogin);
customer.post("/register", validateRegisterCustomer, customerRegister);
customer.post("/order", authUser, customerAddOrder);
// GET
customer.get("/info", authUser, customerInfo);
// EDIT
customer.put("/edit", authUser, customerEditInfo);

export default customer;
