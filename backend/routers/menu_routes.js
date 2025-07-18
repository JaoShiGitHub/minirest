import { Router } from "express";
import { getMenu } from "../controllers/menu.js";
import authUser from "../middlewares/auth.js";

const menu = Router();

menu.get("/", authUser, getMenu);

export default menu;
