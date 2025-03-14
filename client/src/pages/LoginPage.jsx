import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function MenuPage() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);

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

  return (
    <div>
      {data.length > 0 ? (
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
      ) : null}
      <br />
      <button onClick={() => navigate("/home")}>BACK TO HOME</button>
    </div>
  );
}

export default MenuPage;
