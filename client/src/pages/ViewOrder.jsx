import { useLocation } from "react-router-dom";

function ViewOrder() {
  const location = useLocation();
  const { order, key } = location.state;
  console.log(order);
  console.log(key);

  return (
    <div>
      <h1>{key}</h1>
      {order.map((item) => {
        return (
          <div key={item.id}>
            <span>{item.product_name}</span>
          </div>
        );
      })}
    </div>
  );
}

export default ViewOrder;
