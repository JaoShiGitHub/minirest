import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

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
    <div>
      {data.length > 0 ? (
        !orderStatus ? (
          <div className="menu-container">
            {data.map((menu) => {
              return (
                <div key={menu.menu_id}>
                  <p>{menu.name}</p>
                  <span>{menu.price}</span>
                </div>
              );
            })}
            <br />
            <button onClick={() => setOrderStatus(!orderStatus)}>ORDER</button>
          </div>
        ) : (
          <form onSubmit={handleOnSubmit}>
            {data.map((menu) => {
              return (
                <label key={menu.menu_id}>
                  <input
                    id={menu.menu_id}
                    type="checkbox"
                    checked={selectedMenu[menu.menu_id] || false}
                    onChange={() => handleCheckboxChange(menu)}
                    name={menu.name}
                  />
                  <p>{menu.name}</p>
                  <span>{menu.price}</span>
                </label>
              );
            })}
            <br />
            <br />
            <button type="submit">ORDER NOW</button>
          </form>
        )
      ) : null}

      <button onClick={() => navigate("/home")}>BACK TO HOME</button>
    </div>
  );
}

export default MenuPage;
