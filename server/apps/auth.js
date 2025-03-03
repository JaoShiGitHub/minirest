import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Router } from "express";
import { pool } from "../utils/db.js";

const authRouter = Router();

authRouter.post("/login", async (req, res) => {
  const { identifier, password } = req.body;
  function isEmail(input) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input);
  }

  const type = isEmail ? "Email" : "Username";

  const data = await pool.query(
    `SELECT * FROM customers WHERE ${type.toLocaleLowerCase()} = $1`,
    [identifier]
  );

  const customer = data.rows[0];

  if (customer.length === 0) {
    return res.status(404).json({ message: `${type} not found` });
  }

  const isValidPassword = await bcrypt.compare(password, customer.password);

  if (!isValidPassword) {
    return res.status(400).json({ message: "Invalid Password" });
  }

  const token = jwt.sign(
    {
      id: customer.id,
      firstName: customer.firstname,
      lastName: customer.lastname,
    },
    process.env.SECRET_KEY,
    {
      expiresIn: 900000,
    }
  );

  return res.status(200).json({ message: "Login Successfully", token });
});

export default authRouter;
