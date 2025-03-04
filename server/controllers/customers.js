const customerLogin = (req, res) => {
  return res.json({ message: "Login Successful" });
};

const customerRegister = (req, res) => {
  return res.json({ message: "Hello register" });
};
export { customerLogin, customerRegister };
