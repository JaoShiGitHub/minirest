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

  useEffect(() => {
    getMenu();
  }, []);

  const getMenu = async () => {
    try {
      const MENU = await axios.get("http://localhost:4000/menu", {
        withCredentials: true,
      });
      setData(MENU?.data?.data);
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
            <button className={menuBarStyle}>Select Items</button>
            <button className={menuBarStyle}> Filter Drink</button>
          </div>
        </section>

        <section className="font-lato flex mb-20 justify-center items-center">
          {data.length > 0 ? (
            !orderStatus ? (
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
                      <p className="font-bold text-xl mt-2">{menu.name}</p>
                      <span className="text-base">{menu.price} ฿</span>
                    </li>
                  );
                })}
                <br />
                {/* <button
                  className="font-bold bg-white  px-4 py-1 self-center rounded-full shadow-md"
                  onClick={() => setOrderStatus(!orderStatus)}
                >
                  SELECT ITEMS
                </button> */}
              </ul>
            ) : (
              <form
                onSubmit={handleOnSubmit}
                className="flex flex-col w-full max-w-[500px]"
              >
                {data.map((menu) => {
                  return (
                    <label
                      key={menu.menu_id}
                      className="flex justify-between text-2xl mb-5"
                    >
                      <div>
                        <input
                          id={menu.menu_id}
                          type="checkbox"
                          checked={selectedMenu[menu.menu_id] || false}
                          onChange={() => handleCheckboxChange(menu)}
                          name={menu.name}
                          className="mr-8 w"
                        />
                        <b className="">{menu.name}</b>
                      </div>
                      <span>{menu.price} ฿</span>
                    </label>
                  );
                })}
                <br />
                <br />
                <button
                  type="submit"
                  className="self-center bg-white px-3 font-bold py-1 rounded-full shadow-lg"
                >
                  ORDER NOW
                </button>
              </form>
            )
          ) : null}
        </section>
      </div>
    </main>
  );
}

export default MenuPage;
