import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import ConfirmOrder from "../components/ConfirmOrder";

const menuBarStyle =
  "bg-white px-6 py-2 rounded-full shadow-lg hover:bg-orange-300 transition-colors duration-300";

function MenuPage() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [orderNowBtn, setOrderNowBtn] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [isSelectBtn, setIsSelectBtn] = useState(false);
  const [confirmOrderComponent, setConfirmOrderComponent] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);

  useEffect(() => {
    getMenu();
  }, []);

  const getMenu = async () => {
    try {
      const MENU = await axios.get("http://localhost:4000/menu", {
        withCredentials: true,
      });

      const menu = MENU?.data?.data;

      const updatedMenu = menu.map((item) => ({
        ...item,
        count: 0,
      }));

      setData(updatedMenu);
      console.log(MENU?.data?.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleOnClickAddItem = (menu_id) => {
    const updatedData = data.map((item) => {
      if (item.menu_id === menu_id) {
        return { ...item, count: item.count + 1 };
      }
      return item;
    });
    setData(updatedData);
  };

  const handleOnClickRemoveItem = (menu_id) => {
    const updatedData = data.map((item) => {
      if (item.menu_id === menu_id && item.count > 0) {
        return { ...item, count: item.count - 1 };
      }
      return item;
    });
    setData(updatedData);
  };

  useEffect(() => {
    const hasCountMoreThanZero = data.some((item) => item.count > 0);

    if (hasCountMoreThanZero) {
      setSelectedItems(data.filter((item) => item.count > 0));
      setOrderNowBtn(hasCountMoreThanZero);
    }
  }, [data]);

  if (orderSuccess) {
    setOrderNowBtn(false);
    setIsSelectBtn(false);
    setOrderSuccess(false);
    setSelectedItems([]);
    setData((prevData) => prevData.map((item) => ({ ...item, count: 0 })));
  }

  return (
    <main>
      <NavBar />
      <div className="flex justify-center flex-col items-center">
        <section className="flex w-full justify-between items-center px-48">
          <h1 className="font-playfairDisplay font-bold text-3xl my-20">
            MENU
          </h1>
          <div className="flex gap-x-5 font-bold">
            {isSelectBtn ? null : (
              <button
                className={menuBarStyle}
                onClick={() => setIsSelectBtn(true)}
              >
                Select Items
              </button>
            )}
            {orderNowBtn && (
              <button
                className={menuBarStyle}
                onClick={() => setConfirmOrderComponent(true)}
              >
                Order Now
              </button>
            )}
            {/* <button className={menuBarStyle}> Filter Drink</button> */}
          </div>
        </section>

        <ul className="w-full flex flex-wrap gap-5 gap-x-10 max-w-[1544px] h-full justify-center font-lato ">
          {data.map((menu) => {
            return (
              <li
                key={menu.menu_id}
                className="flex justify-between text-2xl flex-col items-center"
              >
                <img
                  className="w-full max-w-[300px] h-[360px] rounded-3xl"
                  src={`data:image/jpeg;base64,${btoa(
                    menu?.image?.data.reduce(
                      (data, byte) => data + String.fromCharCode(byte),
                      ""
                    )
                  )}`}
                  alt={menu?.name}
                />
                {isSelectBtn && (
                  <div className="flex gap-x-4 items-center mt-4 mb-1">
                    <button
                      className="bg-white shadow-xl rounded-full px-6 hover:bg-orange-300"
                      onClick={() => handleOnClickRemoveItem(menu.menu_id)}
                    >
                      -
                    </button>
                    <span className="text-xl">{menu.count}</span>
                    <button
                      className="bg-white shadow-xl rounded-full px-6 hover:bg-orange-300"
                      onClick={() => handleOnClickAddItem(menu.menu_id)}
                    >
                      +
                    </button>
                  </div>
                )}
                <p className="font-bold text-xl mt-2">{menu.name}</p>
                <span className="text-base">{menu.price} ฿</span>
              </li>
            );
          })}
        </ul>
      </div>
      {confirmOrderComponent && (
        <ConfirmOrder
          closeForm={setConfirmOrderComponent}
          items={selectedItems}
          orderSuccess={orderSuccess}
          setOrderSuccess={setOrderSuccess}
          setConfirmOrderComponent={setConfirmOrderComponent}
        />
      )}
    </main>
  );
}

export default MenuPage;
