import axios from "axios";
import React, { useEffect, useState } from "react";
import FullHistory from "../components/FullHistory";
import NavBar from "../components/NavBar";

export const HistoryDataContext = React.createContext();

function HistoryPage() {
  const [orders, setOrders] = useState([]);
  const [isOpened, setIsOpened] = useState(false);
  const [orderDetails, setOrderDetails] = useState({});

  useEffect(() => {
    getOrder();
  }, []);

  const getOrder = async () => {
    try {
      const response = await axios.get("http://localhost:4000/order/history", {
        withCredentials: true,
      });

      const reversedOrders = response?.data?.filteredOrdered.reverse();
      setOrders(reversedOrders || []);
    } catch (err) {
      console.log(err);
    }
  };

  const Detail = (props) => {
    const { title, info } = props;
    return (
      <div className="flex font-lato gap-1 text-lg">
        <b>{title}</b>
        <p className="font-normal">{info}</p>
      </div>
    );
  };

  const handleSeeMoreBtn = (order) => {
    setIsOpened(!isOpened);
    setOrderDetails(order);
  };

  return (
    <div className="h-full font-lato flex flex-col items-center">
      <HistoryDataContext.Provider
        value={{ isOpened, setIsOpened, orderDetails, setOrderDetails }}
      >
        <NavBar />

        <ul className="flex flex-wrap gap-x-10 w-full pl-36">
          <h1 className="font-bold text-3xl w-full my-20 ">History</h1>
          {orders.length === 0 && (
            <div className="text-lg">No order history found</div>
          )}
          {orders.map((item) => {
            return (
              <li
                className="bg-white mb-7 py-7 pl-8 flex flex-col gap-y-2 rounded-xl shadow-xl max-w-[520px]"
                key={item?.order_id}
              >
                <span className="font-bold text-2xl mb-1">{item.order_id}</span>
                <div className="grid grid-cols-2 gap-x-9 gap-y-1 pl-7 ">
                  <Detail title="Status: " info={item.status} />
                  <Detail title="Total: " info={`${item?.total} ฿`} />
                  <Detail
                    title="Date: "
                    info={new Date(item.time).toLocaleDateString("en-GB")}
                  />
                  <b>
                    {item?.items.reduce((acc, item) => acc + item.amount, 0)}{" "}
                    {item.items.length > 1 ? "Items" : "Item"}
                  </b>
                  <Detail
                    title="Time: "
                    info={new Date(item.time).toTimeString().slice(0, 5)}
                  />
                </div>
                <button
                  className="self-end underline mr-16"
                  onClick={() => handleSeeMoreBtn(item)}
                >
                  See more
                </button>
              </li>
            );
          })}
        </ul>

        {isOpened ? <FullHistory /> : null}
      </HistoryDataContext.Provider>
    </div>
  );
}

export { HistoryPage };
