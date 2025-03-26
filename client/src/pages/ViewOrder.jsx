import { useNavigate, useLocation } from "react-router-dom";

function ViewOrder() {
  const location = useLocation();
  const navigate = useNavigate();
  const { order, key } = location.state;

  const handleDelete = () => {
    let deletedOrders = JSON.parse(localStorage.getItem("deletedOrders")) || [];
    deletedOrders.push(key);
    localStorage.setItem("deletedOrders", JSON.stringify(deletedOrders));
    navigate(-1);
  };

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
      <button onClick={handleDelete}>Delete order</button>
    </div>
  );
}

export default ViewOrder;
