import { pool } from "../utils/db.js";
import bcrypt from "bcrypt";

const customerRegister = async (req, res) => {
  const { username, firstName, lastName, tel, email, birthday, allergy } =
    req.body;
  const customer = { password: req.body.password };

  const salt = await bcrypt.genSalt(10);
  customer.password = await bcrypt.hash(customer.password, salt);

  try {
    await pool.query(
      `INSERT INTO customers (username, password, firstname, lastname, tel, email, allergy, birthday ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
      [
        username,
        customer.password,
        firstName,
        lastName,
        tel,
        email,
        allergy,
        birthday,
      ]
    );
    return res
      .status(200)
      .json({ message: "Welcome to the Mini Rest in Thailand ka." });
  } catch (error) {
    return res.json({ message: `Error inserting user: ${error}` });
  }
};

const customerOrder = async (req, res) => {
  const { customer_id, description, dining_status, payment_status, orders } =
    req.body;
  const status = "Order Placed";
  const order_date = new Date().toISOString();
  const order_id = Math.random().toString(36).substring(2, 18);

  try {
    await pool.query(
      `INSERT INTO customer_orders (order_id, customer_id, status, order_date, description, dining_status, payment_status) VALUES ($1, $2, $3, $4, $5, $6, $7 )`,
      [
        order_id,
        customer_id,
        status,
        order_date,
        description,
        dining_status,
        payment_status,
      ]
    );

    const orderQueries = orders.map((order) => {
      pool.query(
        `INSERT INTO order_items (order_id, product_id ,product_name, product_price) VALUES ($1, $2, $3, $4)`,
        [order_id, order.product_id, order.product_name, order.product_price]
      );
    });

    await Promise.all(orderQueries);

    return res.status(200).json({ message: "Order has been created" });
  } catch (error) {
    return res.json({ error: error });
  }
};

const editCustomerInfo = async (req, res) => {
  const { username, firstName, lastName, tel, email, allergy, birthday } =
    req.body;
  const { customer_id } = req.query;
  try {
    await pool.query(
      `UPDATE customers SET username = $1, firstname = $2, lastname = $3, tel= $4, email = $5, allergy = $6, birthday = $7 WHERE id = $8`,
      [
        username,
        firstName,
        lastName,
        tel,
        email,
        allergy,
        birthday,
        customer_id,
      ]
    );
    return res.json({ message: "Customer info has been updated" });
  } catch (error) {
    return res.json({ error: error });
  }
};

const customerInfo = async (req, res) => {
  const { customer_id } = req.query;
  try {
    const info = await pool.query("SELECT * FROM customers WHERE id = $1", [
      customer_id,
    ]);
    return res.status(200).json({
      message: "Customer info fetched successfully",
      data: info.rows[0],
    });
  } catch (error) {
    console.log("Error: ", error);
  }
};

export { customerRegister, customerOrder, editCustomerInfo, customerInfo };
