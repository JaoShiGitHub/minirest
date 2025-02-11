export const validateLoginCostumer = (req, res, next) => {
  const costumer = req.body;

  if (!costumer.email) {
    return res.status.json({
      message: "Name is required",
    });
  }

  next();
};
