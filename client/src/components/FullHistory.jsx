import { useContext } from "react";
import { HistoryDataContext } from "../pages/HistoryPage";

function FullHistory() {
  const { isOpened, setIsOpened, orderDetails, setOrderDetails } =
    useContext(HistoryDataContext);

  console.log(orderDetails);

  const Details = (props) => {
    const { title, detail } = props;

    return (
      <div>
        <strong>{title}</strong>
        <span>{detail}</span>
      </div>
    );
  };

  return (
    <main className="h-screen w-screen bg-[rgba(0,0,0,0.55)] top-0 flex justify-center items-center fixed ">
      <div className="min-w-[450px]">
        <section className="bg-white pt-20 pb-20 px-10 rounded-3xl shadow-xl">
          <div className="flex justify-between items-end mb-8">
            <b className="text-3xl">{orderDetails?.order_id}</b>
            <Details title="Status: " detail={orderDetails?.status} />
          </div>
          <div className="flex flex-col gap-y-3 pl-9">
            <Details
              title="Date: "
              detail={new Date(orderDetails?.time).toLocaleDateString()}
            />
            <Details title="Dining: " detail={orderDetails?.status} />
            <Details title="Payment: " detail={orderDetails?.status} />
            <Details
              title="Request: "
              detail={
                orderDetails?.description === ""
                  ? "-"
                  : orderDetails?.description
              }
            />

            <p>Dining : Delivery</p>
            <p>Payment: mobile babanking </p>
          </div>
          <hr className="my-8" />
          <b className="text-lg">3 Items</b>
          <div className="flex flex-col gap-2 mt-4 mb-6">
            <div className="flex justify-between px-10">
              <span>Thai Tea</span>
              <span>55.00</span>
            </div>
            <div className="flex justify-between px-10">
              <span>Butterfly Pea Lemonade</span>
              <span>45.00</span>
            </div>
            <div className="flex justify-between px-10">
              <span>Cha Manao</span>
              <span>45.00</span>
            </div>
          </div>
          <div className="flex justify-between px-10">
            <strong>Total</strong>
            <span>145.00</span>
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
