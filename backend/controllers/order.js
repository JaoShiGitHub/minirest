import { pool } from "../utils/db.js";

const orderHistory = async (req, res) => {
  const { customer_id } = req.query;

  try {
    const data = await pool.query(
      "SELECT * FROM customer_orders WHERE customer_id = $1",
      [customer_id]
    );
    const arrOrderId = data.rows.map((obj) => obj["order_id"]);

    const idAndStatus = data.rows.map((obj) => ({
      order_id: obj["order_id"],
      status: obj["status"],
      time: obj["order_date"],
      description: obj["description"],
      dining_status: ["dining_status"],
      payment_status: ["delivery"],
    }));

    const placeholders = arrOrderId
      .map((_, index) => `$${index + 1}`)
      .join(", ");

    const orderItems = await pool.query(
      `SELECT * FROM order_items WHERE order_id IN (${placeholders})`,
      arrOrderId
    );

    // I use this code because I want to group the items that have the same order_id together
    // Otherwise they'll come separately
    const items = orderItems.rows.reduce((acc, item) => {
      acc[item.order_id] = acc[item.order_id] || [];
      acc[item.order_id].push(item);
      return acc;
    }, {});

    const orderDetails = idAndStatus.map((order) => {
      let newDetails = {};

      Object.entries(items).map(([key, value]) => {
        if (key === order.order_id) {
          newDetails = {
            ...order,
            items: value,
          };
        }
      });

      return newDetails;
    });

    const filteredOrdered = orderDetails.filter(
      (order) => Object.keys(order).length > 0
    );

    return res
      .status(200)
      .json({ message: "Order history fetched successfully", orderItems });
  } catch (error) {
    return res.json({ error: error });
  }
};

export { orderHistory };
