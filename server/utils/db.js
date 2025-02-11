import * as pg from "pg";
const { Pool } = pg.default;

const pool = new Pool({
  connectionString: "postgresql://postgres:postgres@localhost:5432/posts",
});

const pgGetAllMenu = async () => {
  try {
    const data = await pool.query("SELECT * FROM users");
    return data.rows;
  } catch (error) {
    console.error("Database error: ", error);
    throw error;
  }
};

const pgNewMenu = async (items) => {
  try {
    const newMenu = await pool.query(
      `INSERT INTO menu (menu_id, name, ingredients, price, warning)
      value ($1, $2, $3, $4, $5)
      `[(1, items.name, items.ingredients, items.price, items.warning)]
    );
  } catch (error) {
    res.status(500).json({ error: "Failed to insert data" });
  }
};

export { pool, pgGetAllMenu, pgNewMenu };
