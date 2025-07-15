import { Router } from "express";
import {
  customerRegister,
  customerOrder,
  customerInfo,
  editCustomerInfo,
} from "../controllers/customers.js";
import { validateRegisterCustomer } from "./customerValidation.js";

const customer = Router();

customer.post("/register", validateRegisterCustomer, customerRegister);
customer.post("/order", customerOrder);
customer.get("/customer", customerOrder);
customer.get("/info", customerInfo);
customer.put("/edit", editCustomerInfo);
// Test github
export default customer;
