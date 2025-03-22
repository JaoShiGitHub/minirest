import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function HistoryPage() {
  const [orders, setOrders] = useState([]);
  const navigator = useNavigate();

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
    console.log(key);

    navigator("/view-order", { state: { order, key } });
  };

  return (
    <div>
      <h1>HistoryPage</h1>
      {Object.entries(orders).map(([key, order]) => {
        return (
          <button
            style={style}
            key={order.id}
            onClick={() => handleOrderClick(order, key)}
          >
            <h1>Order: {key}</h1>
            <div>
              {order.map((item) => {
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
              {order.reduce((orderAcc, item) => {
                return orderAcc + parseFloat(item.product_price);
              }, 0)}
            </span>
          </button>
        );
      })}
    </div>
  );
}

export default HistoryPage;
