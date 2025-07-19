import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";

const menuBarStyle =
  "bg-white px-6 py-2 rounded-full shadow-lg hover:bg-orange-200 transition-colors duration-300";

function MenuPage() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [orderStatus, setOrderStatus] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState([]);
  const [isSelectBtn, setIsSelectBtn] = useState(false);

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

  const handleCheckboxChange = (menu) => {
    setSelectedMenu((prevMenu) => ({
      ...prevMenu,
      [menu.menu_id]: menu,
    }));
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("orders", selectedMenu);
    console.log(selectedMenu);

    setSelectedMenu({});
    navigate("/order-now");
  };

  return (
    <main className="">
      <NavBar />
      <div className="flex justify-center flex-col items-center">
        <section className="flex w-full justify-between items-center px-48">
          <h1 className="font-playfairDisplay font-bold text-3xl my-20">
            MENU
          </h1>
          <div className="flex gap-x-5 font-bold">
            <button
              className={menuBarStyle}
              onClick={() => setIsSelectBtn(true)}
            >
              Select Items
            </button>
            <button className={menuBarStyle}> Filter Drink</button>
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
                {isSelectBtn ? (
                  <div className="flex gap-x-4 items-center mt-4 mb-1">
                    <button className="bg-white shadow-xl rounded-full px-6 hover:bg-orange-300">
                      -
                    </button>
                    <span className="text-xl">{menu.count}</span>
                    <button className="bg-white shadow-xl rounded-full px-6 hover:bg-orange-300">
                      +
                    </button>
                  </div>
                ) : null}
                <p className="font-bold text-xl mt-2">{menu.name}</p>
                <span className="text-base">{menu.price} ฿</span>
              </li>
            );
          })}
        </ul>
      </div>
    </main>
  );
}

export default MenuPage;
