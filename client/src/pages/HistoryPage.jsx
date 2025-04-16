import axios from "axios";
import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
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
    <div className="h-screen font-lato">
      <NavBar />
      <div className="my-10 px-20">
        <h1 className=" font-bold text-3xl">History</h1>
      </div>

      <ul className="grid grid-cols-3">
        {orders.map((item) => {
          return (
            <li className="bg-white w-fit mb-5" key={item.order_id}>
              <span className="font-bold">{item.order_id}</span>
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
