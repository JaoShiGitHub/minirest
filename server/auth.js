import { Router } from "express";
import bcrypt from "bcrypt";
import * as pg from "pg";
const authRouter = Router();
const { Pool } = pg.default;

const pool = new Pool({
  connectionString: "postgresql://postgres:postgres@localhost:5432/mini_rest",
});

authRouter.post("/register", async (req, res) => {
  try {
    const {
      username,
      password,
      firstname,
      lastname,
      birthday,
      tel,
      email,
      allergy,
    } = req.body;

    const salt = await bcrypt.genSalt(10);

    // password = await bcrypt.hash(password, salt);
    const hashedPassword = await bcrypt.hash(password, salt);

    await pool.query(
      `INSERT INTO customers (username, password, firstname, lastname, birthday, tel, email, allergy) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
      [
        username,
        hashedPassword,
        firstname,
        lastname,
        birthday,
        tel,
        email,
        allergy,
      ]
    );
    return res.json({ message: "User has been created successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to insert data" });
  }
});

export default authRouter;
