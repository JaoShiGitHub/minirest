import axios from "axios";
import { useNavigate } from "react-router-dom";

function PlaceOrderPage() {
  const navigate = useNavigate();
  const menuItems = [
    { product_id: 4, product_name: "Pink Milk", product_price: "1500.00" },
    { product_id: 5, product_name: "Thai Tea", product_price: "150.00" },
    { product_id: 6, product_name: "Green Tea", product_price: "3500.00" },
  ];

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const diningStatus = formData.get("dining-options");
    const description = formData.get("customer-request");

    try {
      const response = await axios.post(
        "http://localhost:4000/customer/order",
        {
          customer_id: 10,
          description: description,
          dining_status: diningStatus,
          payment_status: "",
          orders: menuItems,
        }
      );
      console.log("Success: ", response);
      navigate("/order-received");
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  return (
    <div>
      <h1>Your Order</h1>
      <div>
        {menuItems.map((item) => {
          return (
            <div key={item.product_id}>
              <p>{item.product_name}</p>
              <span>{item.product_price}</span>
            </div>
          );
        })}
      </div>
      <br />
      <form onSubmit={handleOnSubmit}>
        <label htmlFor="dining-options"></label>
        <select name="dining-options" id="dining-options">
          <option value="takeout">Take Out</option>
          <option value="dine-in">Dine In</option>
          <option value="delivery">Delivery</option>
        </select>
        <br />
        <br />
        <label htmlFor="customer-request">Wanna tell us something?</label>
        <br />
        <br />
        <textarea id="customer-request" name="customer-request"></textarea>
        <br />
        <br />
        <button type="submit">Place Order</button>
      </form>
      <button onClick={() => navigate("/home")}>HOME</button>
    </div>
  );
}

export default PlaceOrderPage;
