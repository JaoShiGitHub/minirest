import axios from "axios";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";

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

  const total = menuItems.reduce(
    (acc, curr) => acc + parseFloat(curr.product_price),
    0
  );

  return (
    <div className="bg-background h-screen">
      <NavBar />
      <di className="flex flex-col items-center mt-24">
        <div className="flex flex-col items-center max-w-[500px]">
          <h1 className="font-bold self-start text-xl mb-10">
            {menuItems.length} {menuItems.length > 1 ? "Items" : "Item"}
          </h1>
          <div className="w-full max-w-[450px]">
            {menuItems.map((item) => {
              return (
                <div
                  key={item.product_id}
                  className="flex justify-between mb-3"
                >
                  <p>{item.product_name}</p>
                  <span>{item.product_price} ฿</span>
                </div>
              );
            })}
          </div>
          <br />
          <div className="flex justify-between w-full max-w-[450px]">
            <b>Total</b>
            <p>{total} ฿</p>
          </div>
          <br />
          <form
            onSubmit={handleOnSubmit}
            className="flex flex-col items-center"
          >
            <label htmlFor="dining-options"></label>
            <select
              name="dining-options"
              id="dining-options"
              className="w-[500px] rounded-3xl text-center py-2 shadow-lg text-lg appearance-none my-5"
            >
              <option value="takeout">Take Out</option>
              <option value="dine-in">Dine In</option>
              <option value="delivery">Delivery</option>
            </select>

            <label htmlFor="customer-request" className="text-xl my-6">
              Wanna tell us something?
            </label>

            <textarea
              className="w-[500px] rounded-xl p-5 border border-[#dcdcdc]"
              id="customer-request"
              name="customer-request"
            ></textarea>
            <br />
            <br />
            <button
              type="submit"
              className="w-[500px] bg-[#13E700] rounded-full shadow-lg mb-24 h-12 text-lg font-semibold"
            >
              CONFIRM
            </button>
          </form>
        </div>
      </di>
    </div>
  );
}

export default PlaceOrderPage;
