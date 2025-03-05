import { Router } from "express";
import { customerRegister, customerLogin } from "../controllers/customers.js";
import {
  validateLoginCustomer,
  validateRegisterCustomer,
} from "./customerValidation.js";

const customer = Router();

customer.post("/register", validateRegisterCustomer, customerRegister);
customer.post("/login", validateLoginCustomer, customerLogin);

export default customer;
