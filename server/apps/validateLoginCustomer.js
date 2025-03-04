const validateLoginCustomer = async (req, res, next) => {
  const { identifier, password } = req.body;
  // identifier = email || username

  if (!identifier) {
    return res
      .status(400)
      .json({ error: "Please type your username or email." });
  }

  if (!password) {
    return res.status(400).json({ message: "Password is required." });
  }

  next();
};

export default validateLoginCustomer;
