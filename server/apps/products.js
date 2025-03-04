import { Router } from "express";
import { getMenu } from "../controllers/menu";
import { customerRegister } from "../controllers/customers.js";

const customer = Router();

customer.get("/", (req, res) => {
  res.json({ message: "Home page" });
});

customer.get("/menu", getMenu); // ✅
customer.post("/register", customerRegister);
// customer.get("/login", [validateLoginCustomer], customerLogin);

customer.get("/cart", (req, res) => {});

customer.post("/cart", (req, res) => {});
customer.get("/history", (req, res) => {});
customer.delete("/history", (req, res) => {});

customer.put("/currentorders/:id", (req, res) => {});
customer.get("/currentorders", (req, res) => {});
