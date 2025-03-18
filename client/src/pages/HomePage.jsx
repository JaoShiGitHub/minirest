import { useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();

  const handleMenuBtn = () => {
    navigate("/menu");
  };

  const handleHistoryBtn = () => {
    navigate("/order-history");
  };

  return (
    <div>
      <header>
        <h1>MINIREST</h1>
        <p>Welcome to Minirest</p>
      </header>
      <nav>
        <button onClick={handleMenuBtn}>MENU</button>
        <button onClick={handleHistoryBtn}>HISTORY</button>
      </nav>
    </div>
  );
}

export default HomePage;
