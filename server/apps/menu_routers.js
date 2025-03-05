import { Router } from "express";
import { getMenu } from "../controllers/menu.js";

const menu = Router();

menu.get("/", getMenu);

export default menu;
