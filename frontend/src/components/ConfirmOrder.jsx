function ConfirmOrder(props) {
  const { items } = props;
  const handleConfirm = async () => {};
  console.log(items);

  const total = items.reduce((acc, item) => acc + item.price * item.count, 0);
  return (
    <section className="fixed overflow-hidden inset-0 bg-[hsla(0,0%,10%,0.6)] flex items-center justify-center w-screen h-screen">
      <div className="bg-white min-w-[450px] rounded-2xl p-10">
        <h2>
          {items.length > 1 ? "Items" : "Item"}: {items.length}
        </h2>
        <ul>
          {items.map((item) => (
            <li key={item.menu_id} className="flex justify-between">
              <div className="flex gap-x-4">
                <span>{item.count}</span>
                <p>{item.name}</p>
              </div>
              <span>{item.price} ฿</span>
            </li>
          ))}
          <div className="flex justify-between">
            <b>Total</b>
            <span>{total}</span>
          </div>
        </ul>
      </div>
    </section>
  );
}

export default ConfirmOrder;
