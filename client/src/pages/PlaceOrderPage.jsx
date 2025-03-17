import axios from "axios";
import { useState } from "react";

function PlaceOrderPage() {
  const menuItems = [
    { menu_id: 4, name: "Pink Milk", price: "1500.00" },
    { menu_id: 5, name: "Thai Tea", price: "150.00" },
    { menu_id: 6, name: "Green Tea", price: "3500.00" },
  ];

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const diningOption = formData.get("dining-options");
    const customerRequest = formData.get("customer-request");

    console.log("Order success", diningOption, customerRequest);
  };

  return (
    <div>
      <h1>Your Order</h1>
      <div>
        {menuItems.map((item) => {
          return (
            <div>
              <p>{item.name}</p>
              <span>{item.price}</span>
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
    </div>
  );
}

export default PlaceOrderPage;
