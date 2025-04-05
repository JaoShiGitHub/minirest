import axios from "axios";
import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

function HistoryPage() {
  const [orders, setOrders] = useState([]);
  // const [deletedOrders, setDeletedOrders] = useState(
  //   JSON.parse(localStorage.getItem("deletedOrders")) || []
  // );

  // const navigate = useNavigate();

  const style = {
    cursor: "pointer",
  };

  useEffect(() => {
    getOrder();
  }, []);

  // useEffect(() => {
  //   const storedDeletedOrders =
  //     JSON.parse(localStorage.getItem("deletedOrders")) || [];
  //   setDeletedOrders(storedDeletedOrders);
  // }, []);

  const getOrder = async () => {
    try {
      const orders = await axios.get(
        "http://localhost:4000/order/history?customer_id=10"
      );
      console.log(orders?.data?.filteredOrdered);

      setOrders(orders?.data?.filteredOrdered);
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  // const handleOrderClick = (key, order) => {
  //   navigate("/view-order", {
  //     state: { order, key },
  //   });
  // };

  return (
    <div className="h-screen">
      <h1 className="">HistoryPage</h1>
      <ul>
        {orders.map((item) => {
          return (
            <li className="bg-white mb-5" key={item.order_id}>
              <span>Oder: {item.order_id}</span>
              <p>Status: {item.status}</p>
              <p>{item.items.length} Items</p>
              <button className="mt-5 underline">See more</button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export { HistoryPage };
