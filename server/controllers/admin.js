import { isEmail } from "../utils/common.js";
import { pool } from "../utils/db.js";
import bcrypt from "bcrypt";

const adminRegister = async (req, res) => {
  const { username, firstname, lastname, tel, email, admin_role } = req.body;
  const admin = { password: req.body.password };
  const salt = await bcrypt.genSalt(10);
  admin.password = await bcrypt.hash(admin.password, salt);

  try {
    await pool.query(
      `INSERT INTO admins (username, firstname, lastname, tel, email, admin_role, password) VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [username, firstname, lastname, tel, email, admin_role, admin.password]
    );
    return res.status(200).json({ message: `Welcome new admin` });
  } catch (error) {
    return res.status(401).json({ error: error });
  }
};

const adminLogin = async (req, res) => {
  const { identifier, password } = req.body;
  const type = isEmail(identifier) ? "Email" : "Username";

  const data = await pool.query(
    `SELECT * FROM admins WHERE ${type.toLowerCase()} = $1`,
    [identifier]
  );
  const admin = data.rows[0];

  if (!admin) {
    return res.status(404).json({ message: `${type} not found` });
  }

  const isValidPassword = await bcrypt.compare(password, admin.password);
  if (!isValidPassword) {
    return res.status(400).json({ message: `Invalid Password` });
  }

  const token = jwt.sign(
    {
      id: admin.id,
      firstName: admin.firstname,
      lastName: admin.lastname,
    },
    process.env.SECRET_KEY,
    {
      expiresIn: 900000,
    }
  );

  return res
    .status(200)
    .json({ message: `Welcome back ${admin.firstname}`, token });
};

export { adminRegister, adminLogin };
