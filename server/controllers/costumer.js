import { pgGetAllMenu } from "../utils/db";

const getMenu = async (req, res) => {
  try {
    const data = await pgGetAllMenu();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch data" });
  }
};

export { getMenu };
