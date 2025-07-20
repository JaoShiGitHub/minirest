function ConfirmOrder(props) {
  const { items, closeForm } = props;

  const handleConfirm = async () => {};
  console.log(items);

  const total = items.reduce((acc, item) => acc + item.price * item.count, 0);
  const order_items = items.reduce((acc, item) => acc + item.count, 0);

  return (
    <section className="tracking-wide fixed flex-col gap-y-5 overflow-hidden inset-0 bg-[hsla(0,0%,10%,0.6)] flex items-center justify-center w-screen h-screen">
      <button
        className="material-symbols-outlined self-end mr-56 bg-white hover:bg-orange-300 shadow-lg p-3 rounded-full"
        onClick={() => closeForm(false)}
      >
        close
      </button>
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
          <label for="dining" className="flex flex-col items-center">
            <p className=""> Dining Option:</p>
            <select
              id="dining"
              name="dining"
              className="appearance-none bg-neutral-200 shadow-lg w-full py-1 px-4 mb-4 mt-2 rounded-lg outline-none hover:cursor-pointer"
            >
              <option value="dine-in">Dine In</option>
              <option value="takeaway">Takeaway</option>
              <option value="delivery">Delivery</option>
            </select>
          </label>
        </ul>
        <div className="flex items-center flex-col gap-y-2">
          <p>Note to us:</p>
          <textarea className="min-h-40 w-full px-4 py-3 border border-slate-300 rounded-lg shadow-lg outline-none"></textarea>
        </div>
      </div>
      <button className="font-medium hover:bg-orange-800 bg-orange-200 hover:text-amber-50 text-black min-w-[450px] rounded-xl text-xl  py-2">
        Confirm Order
      </button>
    </section>
  );
}

export default ConfirmOrder;
