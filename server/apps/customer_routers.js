import { Router } from "express";
import { customerRegister, customerOrder } from "../controllers/customers.js";
import { validateRegisterCustomer } from "./customerValidation.js";

const customer = Router();

customer.post("/register", validateRegisterCustomer, customerRegister);
customer.post("/order", customerOrder);

export default customer;
