import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";

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
      const MENU = await axios.get("http://localhost:4000/menu");
      setData(MENU?.data?.data?.rows);
      console.log(MENU?.data?.data?.rows);
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
    <main className="h-screen">
      <NavBar />
      <section className="flex justify-center flex-col items-center">
        <h1 className="font-playfairDisplay font-bold text-4xl my-20">MENU</h1>
        <div className="font-lato flex mb-20 justify-center items-center w-full max-w-[500px]">
          {data.length > 0 ? (
            !orderStatus ? (
              <div className="w-full flex flex-col gap-5">
                {data.map((menu) => {
                  return (
                    <div
                      key={menu.menu_id}
                      className="flex justify-between text-2xl"
                    >
                      <p className="font-bold">{menu.name}</p>
                      <span className="font-">{menu.price} ฿</span>
                    </div>
                  );
                })}
                <br />
                <button
                  className="font-bold bg-white  px-4 py-1 self-center rounded-full shadow-md"
                  onClick={() => setOrderStatus(!orderStatus)}
                >
                  SELECT ITEMS
                </button>
              </div>
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
        </div>
      </section>
    </main>
  );
}

export default MenuPage;
