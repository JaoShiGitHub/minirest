const validateLoginCustomer = async (req, res, next) => {
  const { identifier, password } = req.body;
  // identifier = email || username

  if (!identifier) {
    return res.status(400).json({
      error: "Please type your username or password.",
    });
  }

  if (!password) {
    return res.status(400).json({ message: "Password is required." });
  }

  function isEmail(input) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input);
  }

  const type = isEmail ? "email" : "username";

  try {
    const query = `SELECT EXISTS (SELECT 1 FROM customers WHERE ${type} = $1)`;
    const data = await pool.query(query, [identifier]);
    if (data.rows && data.rows.length > 0 && data.rows[0].exists) {
      return next();
    } else {
      return res
        .status(404)
        .json({ error: `${type} "${identifier}" was not found.` });
    }
  } catch (error) {
    console.error("Database Error: ", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export default validateLoginCustomer;
