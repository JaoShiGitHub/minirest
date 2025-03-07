import { pool } from "../utils/db.js";

const getMenu = async (req, res) => {
  try {
    const data = await pool.query("SELECT * FROM menu");
    if (data.status === 404) {
      throw new Error("Menu not found");
    }

    return res.status(200).json({
      message: "Menu fetched successfully",
      data: data,
    });
  } catch (error) {
    if (error.message === "Menu not found") {
      return res.status(404).json({ message: error.message });
    }
    console.error("Database Error: ", error);
  }
};

// Insert menu -> For admin
const insertMenu = async (req, res) => {
  const { name, price } = req.body;
  try {
    await pool.query(`INSERT INTO menu (name, price) VALUES ($1, $2)`, [
      name,
      price,
    ]);
    return res.status(200).json({ message: "Insert Successfully" });
  } catch (error) {
    return res.json({ error: error });
  }
};

export { getMenu, insertMenu };
