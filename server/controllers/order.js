import { pool } from "../utils/db.js";

const orderHistory = async (req, res) => {
  const { customer_id } = req.query;
  try {
    const data = await pool.query(
      "SELECT * FROM customer_orders WHERE customer_id = $1",
      [customer_id]
    );
    const arrOrderId = data.rows.map((obj) => obj["order_id"]);

    const placeholders = arrOrderId
      .map((_, index) => `$${index + 1}`)
      .join(", ");

    const orderItems = await pool.query(
      `SELECT * FROM order_items WHERE order_id IN (${placeholders})`,
      arrOrderId
    );

    const items = orderItems.rows.reduce((acc, item) => {
      acc[item.order_id] = acc[item.order_id] || [];
      acc[item.order_id].push(item);
      return acc;
    }, {});

    return res
      .status(200)
      .json({ message: "Order history fetched successfully", items });
  } catch (error) {
    return res.json({ error: error });
  }
};

export { orderHistory };
