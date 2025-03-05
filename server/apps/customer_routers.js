import { Router } from "express";
import { customerRegister } from "../controllers/customers.js";
import {
  validateLoginCustomer,
  validateRegisterCustomer,
} from "./customerValidation.js";

const customer = Router();

customer.post("/register", validateRegisterCustomer, customerRegister);

export default customer;
