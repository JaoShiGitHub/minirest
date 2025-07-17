import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { pool } from "../utils/db.js";
import { Router } from "express";
import { validateLoginCustomer } from "../middlewares/customer_middlewares.js";
import { isEmail } from "../utils/common.js";

const authRouter = Router();

authRouter.post("/login", [validateLoginCustomer], async (req, res) => {
  const { identifier, password } = req.body;

  const type = isEmail(identifier) ? "Email" : "Username";

  const data = await pool.query(
    `SELECT * FROM customers WHERE ${type.toLowerCase()} = $1`,
    [identifier]
  );

  const customer = data.rows[0];

  if (customer.length === 0) {
    return res.status(404).json({ message: `${type} not found` });
  }

  const isValidPassword = await bcrypt.compare(password, customer.password);

  if (!isValidPassword) {
    return res.status(400).json({ message: `Invalid Password` });
  }

  const token = jwt.sign(
    {
      id: customer.id,
      username: customer.username,
      firstName: customer.firstname,
    },
    process.env.SECRET_KEY,
    {
      expiresIn: "1d",
    }
  );

  res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "Strict",
    maxAge: 24 * 60 * 60 * 1000,
  });

  return res.status(200).json({ message: "Login Successfully", token });
});

export default authRouter;
