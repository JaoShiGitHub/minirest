import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function HistoryPage() {
  const [orders, setOrders] = useState([]);
  const navigator = useNavigate();
  const [deletedItem, setDeletedItem] = useState({ delete: "" });

  const style = {
    cursor: "pointer",
  };

  useEffect(() => {
    getOrder();
  }, []);

  const getOrder = async () => {
    try {
      const orders = await axios.get(
        "http://localhost:4000/order/history?customer_id=10"
      );

      setOrders(orders.data.items);
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  const handleOrderClick = (order, key) => {
    navigator("/view-order", {
      state: { order: order, key: key, setDeletedItem: setDeletedItem },
    });
  };

  const filterOrders = Object.entries(orders).filter((order) =>
    deletedItem.delete ? order.order_id !== deletedItem.delete : orders
  );

  return (
    <div>
      <h1>HistoryPage</h1>
      {filterOrders.map((order) => {
        return (
          <button
            style={style}
            key={order[0]}
            onClick={() => handleOrderClick(order[1])}
          >
            <h1>Order: {order[0]}</h1>
            <div>
              {order[1].map((item) => {
                return (
                  <div key={item.id}>
                    <div>{item.product_name}</div>
                    <span>{item.product_price}</span>
                  </div>
                );
              })}
            </div>
            <span>
              Total:
              {order[1].reduce((orderAcc, item) => {
                return orderAcc + parseFloat(item.product_price);
              }, 0)}
            </span>
          </button>
        );
      })}
    </div>
  );
}

export { HistoryPage };
