import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function MenuPage() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [orderStatus, setOrderStatus] = useState(false);
  const [isChecked, setIsCheck] = useState(false);

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

  const handleOnSubmit = (e) => e.preventDefault();
  const handleCheckboxChange = (e) => setIsCheck(e.target.checked);

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
                    checked={isChecked}
                    onChange={handleCheckboxChange}
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
      <button onClick={() => setOrderStatus(true)}>ORDER</button>
    </div>
  );
}

export default MenuPage;
