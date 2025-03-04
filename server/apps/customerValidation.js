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

const validateRegisterCustomer = async (req, res, next) => {
  const { username, password, firstName, lastName, tel, email, birthday } =
    req.body;

  if (!username) {
    return res.status(400).json({ message: "Username is required!" });
  } else if (username.length > 20) {
    return res.status(400).json({
      message: "Username must be less than 20 characters.",
    });
  }

  if (!password) {
    return res.status(400).json({ message: "Password is required!" });
  }
  next();
};

export { validateRegisterCustomer, validateLoginCustomer };
