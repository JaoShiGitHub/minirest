import { useContext } from "react";
import { HistoryDataContext } from "../pages/HistoryPage";

function FullHistory() {
  const { isOpened, setIsOpened, orderDetails, setOrderDetails } =
    useContext(HistoryDataContext);

  console.log("orderDetails: ", orderDetails);

  const Details = (props) => {
    const { title, detail } = props;

    return (
      <div>
        <strong>{title}</strong>
        <span>{detail}</span>
      </div>
    );
  };

  const itemsCount = orderDetails?.items.reduce((acc, item) => acc);
  const orders = Object.fromEntries(Object.entries(orderDetails).reverse());

  return (
    <main className="h-screen w-screen bg-[rgba(0,0,0,0.55)] top-0 flex justify-center items-center fixed ">
      <div className="min-w-[450px]">
        <section className="bg-white pt-20 pb-20 px-10 rounded-3xl shadow-xl">
          <div className="flex justify-between items-end mb-8">
            <b className="text-3xl">{orders?.order_id}</b>
            <Details title="Status: " detail={orders?.status} />
          </div>
          <div className="flex flex-col gap-y-3 pl-9">
            <Details
              title="Date: "
              detail={new Date(orders?.time).toLocaleDateString()}
            />
            <Details title="Dining: " detail={orders?.dining_status} />
            <Details title="Payment: " detail={orders?.payment_status} />
            <Details
              title="Request: "
              detail={orders?.description === "" ? "-" : orders?.description}
            />
          </div>
          <hr className="my-8" />
          <b className="text-lg">{orders.items.length} Items</b>
          <div className="flex flex-col gap-2 mt-4 mb-6">
            {orders?.items?.map((item) => (
              <div key={item?.id} className="flex justify-between px-10">
                <div className="flex gap-x-2">
                  <span> {item?.amount}</span>
                  <span>{item?.product_name}</span>
                </div>
                <span>{item?.product_price} ฿</span>
              </div>
            ))}
          </div>
          <div className="flex justify-between px-10">
            <strong>Total</strong>
            <span>
              {orders?.items.reduce(
                (acc, item) => acc + Number(item?.product_price),
                0
              )}
              .00 ฿
            </span>
          </div>
        </section>
        <section className="text-white mt-9 flex justify-evenly">
          <button
            className="bg-[#010617] text-2xl shadow-xl min-w-[180px] py-3 rounded-full"
            onClick={() => setIsOpened(false)}
          >
            Close
          </button>
          <button className=" bg-[#D90000] text-2xl shadow-xl min-w-[180px] py-3 rounded-full">
            Delete
          </button>
        </section>
      </div>
    </main>
  );
}

export default FullHistory;
