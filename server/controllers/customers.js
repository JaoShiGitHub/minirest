import { pool } from "../utils/db.js";
import bcrypt from "bcrypt";

const customerRegister = async (req, res) => {
  const { username, firstName, lastName, tel, email, birthday, allergy } =
    req.body;
  const customer = { password: req.body.password };

  const salt = await bcrypt.genSalt(10);
  customer.password = await bcrypt.hash(customer.password, salt);

  try {
    await pool.query(
      `INSERT INTO customers (username, password, firstname, lastname, tel, email, allergy, birthday ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
      [
        username,
        customer.password,
        firstName,
        lastName,
        tel,
        email,
        allergy,
        birthday,
      ]
    );
    return res
      .status(200)
      .json({ message: "Welcome to the Mini Rest in Thailand ka." });
  } catch (error) {
    return res.json({ message: `Error inserting user: ${error}` });
  }
};

export { customerRegister };
