import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function MenuPage() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [orderStatus, setOrderStatus] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState({});

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

  const handleOnSubmit = (e) => {
    e.preventDefault();
    console.log(selectedMenu);
  };

  const handleCheckboxChange = (menu) => {
    setSelectedMenu((prevMenu) => ({
      ...prevMenu,
      [menu.menu_id]: !prevMenu[menu.menu_id],
    }));
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
            <button type="submit">SUBMIT</button>
          </form>
        )
      ) : null}
      <br />
      <button onClick={() => navigate("/home")}>BACK TO HOME</button>
      <br />
      <button onClick={() => setOrderStatus(!orderStatus)}>ORDER</button>
    </div>
  );
}

export default MenuPage;
