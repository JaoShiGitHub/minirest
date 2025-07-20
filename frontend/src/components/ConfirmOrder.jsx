import { useState } from "react";
import axios from "axios";

function ConfirmOrder(props) {
  const { items, closeForm } = props;
  const [note, setNote] = useState("");
  const [diningStatus, setDiningStatus] = useState("");
  const [orderSuccess, setOrderSuccess] = useState(false);

  const total = items.reduce((acc, item) => acc + item.price * item.count, 0);
  const order_items = items.reduce((acc, item) => acc + item.count, 0);

  console.log(items);

  const handleSubmitOrder = async (e) => {
    e.preventDefault();

    const orders = items;
    try {
      const response = await axios.post(
        "http://localhost:4000/customer/order",
        { note, diningStatus, orders },
        { withCredentials: true }
      );
      setOrderSuccess(true);
      console.log("Order submitted successfully:", response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const closeSuccessForm = () => {
    setOrderSuccess(false);
    closeForm(false);
  };
  return (
    <section className="tracking-wide fixed flex-col  overflow-hidden inset-0 bg-[hsla(0,0%,10%,0.6)] flex items-center justify-center w-screen h-screen px-10 gap-y-5">
      {orderSuccess === false && (
        <button
          className="material-symbols-outlined self-end absolute top-20 right-40 bg-white hover:bg-orange-300 shadow-lg p-3 rounded-full"
          onClick={() => closeForm(false)}
        >
          close
        </button>
      )}
      {orderSuccess ? (
        <div className="bg-white flex flex-col items-center rounded-xl text-xl shadow-lg max-w-[600px] w-full py-28 px-10">
          <button
            className="material-symbols-outlined relative self-end rounded-full top-[-70px]"
            onClick={closeSuccessForm}
          >
            close
          </button>

          <p className="">THANK YOU FOR YOUR ORDER ❤️</p>
        </div>
      ) : (
        <div>
          <div className="bg-white min-w-[450px] rounded-2xl p-10">
            <h2 className="text-2xl font-bold">
              {order_items} {order_items > 1 ? "Items" : "Item"}
            </h2>
            <ul className="flex flex-col gap-y-1 mt-4">
              {items.map((item) => (
                <li key={item.menu_id} className="flex justify-between">
                  <div className="flex gap-x-4">
                    <span>{item.count}</span>
                    <p>{item.name}</p>
                  </div>
                  <span>{item.price} ฿</span>
                </li>
              ))}

              <div className="flex justify-between mt-4">
                <b>Total</b>
                <span>{total}</span>
              </div>
            </ul>
            <form id="confirm-order-form" onSubmit={handleSubmitOrder}>
              <label for="dining" className="flex flex-col items-center">
                <p className=""> Dining Option:</p>
                <select
                  id="dining"
                  value={diningStatus}
                  onChange={(e) => setDiningStatus(e.target.value)}
                  className="appearance-none bg-neutral-200 shadow-lg w-full py-1 px-4 mb-4 mt-2 rounded-lg outline-none hover:cursor-pointer"
                >
                  <option value="dine-in">Dine In</option>
                  <option value="takeaway">Takeaway</option>
                  <option value="delivery">Delivery</option>
                </select>
              </label>
              <label className="flex items-center flex-col gap-y-2">
                <p>Message to us:</p>
                <textarea
                  className="min-h-40 w-full px-4 py-3 border border-slate-300 rounded-lg shadow-lg outline-none"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Type your message here..."
                ></textarea>
              </label>
            </form>
          </div>
          <button
            className="font-medium hover:bg-orange-800 bg-orange-200 hover:text-amber-50 text-black min-w-[450px] mt-5 rounded-xl text-xl py-2"
            type="submit"
            form="confirm-order-form"
          >
            Confirm Order
          </button>
        </div>
      )}
    </section>
  );
}

export default ConfirmOrder;
