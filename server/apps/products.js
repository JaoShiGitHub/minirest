import { Router } from "express";
import { validateLoginCostumer } from "./validateLoginCostumer";
import { getMenu } from "../controllers/costumer";

const costumer = Router();

costumer.get("/", (req, res) => {
  res.json({ message: "Home page" });
});

costumer.get("/menu", getMenu); // ✅

costumer.get("/login", [validateLoginCostumer], (req, res) => {});

costumer.post("/register", (req, res) => {});

costumer.get("/cart", (req, res) => {});

costumer.post("/cart", (req, res) => {});
costumer.get("/history", (req, res) => {});
costumer.delete("/history", (req, res) => {});

costumer.put("/currentorders/:id", (req, res) => {});
costumer.get("/currentorders", (req, res) => {});
