import axios from "axios";
import { useEffect, useState } from "react";

function HistoryPage() {
  const [orders, setOrders] = useState([]);
  const [order, setOrder] = useState([]);
  useEffect(() => {
    getOrder();
  }, []);

  const getOrder = async () => {
    try {
      const orders = await axios.get(
        "http://localhost:4000/order/history?customer_id=10"
      );
      setOrders(orders.data.items);
      setOrder(orders.data.items);

      console.log(orders.data);
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  return (
    <div>
      <h1>HistoryPage</h1>
      {Object.entries(orders).map(([key, order]) => {
        return (
          <div key={order.id}>
            <h1>Order: {key}</h1>
            <div>
              {order.map((item) => {
                return (
                  <div>
                    <div key={item.id}>{item.product_name}</div>
                    <span>{item.product_price}</span>
                  </div>
                );
              })}
            </div>
            <span>
              Total:
              {order.product_price.reduce((acc, price) => {
                return acc + price;
              })}
            </span>
          </div>
        );
      })}
    </div>
  );
}

export default HistoryPage;
