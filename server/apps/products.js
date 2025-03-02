import { Router } from "express";
import validateLoginCustomer from "./validateLoginCustomer.js";
import { getMenu } from "../controllers/menu";
import { customerLogin } from "../controllers/customers.js";

const customer = Router();

customer.get("/", (req, res) => {
  res.json({ message: "Home page" });
});

customer.get("/menu", getMenu); // ✅

customer.get("/login", [validateLoginCustomer], customerLogin); // ✅

customer.post("/register", (req, res) => {});

customer.get("/cart", (req, res) => {});

customer.post("/cart", (req, res) => {});
customer.get("/history", (req, res) => {});
customer.delete("/history", (req, res) => {});

customer.put("/currentorders/:id", (req, res) => {});
customer.get("/currentorders", (req, res) => {});
