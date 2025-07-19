import { Router } from "express";
// Middlewares
import authUser from "../middlewares/auth.js";
import {
  validateLoginCustomer,
  validateRegisterCustomer,
} from "../middlewares/customer_middlewares.js";
// Controllers
import {
  customerRegister,
  customerAddOrder,
  customerEditInfo,
  customerInfo,
  customerLogin,
  customerLogout,
} from "../controllers/customers.js";

const customer = Router();

// POST
customer.post("/login", validateLoginCustomer, customerLogin);
customer.post("/register", validateRegisterCustomer, customerRegister);
customer.post("/order", authUser, customerAddOrder);
customer.post("/logout", authUser, customerLogout);
// GET
customer.get("/info", authUser, customerInfo);
// EDIT
customer.put("/edit", authUser, customerEditInfo);

export default customer;
