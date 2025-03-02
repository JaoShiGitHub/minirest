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

export { getMenu };
