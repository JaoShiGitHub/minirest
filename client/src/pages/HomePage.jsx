import { useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();

  const handleButtons = (page) => {
    navigate(`/${page}`);
  };

  return (
    <section className="flex flex-col items-center h-screen">
      <header className="flex flex-col items-center">
        <h1 className="text-black  uppercase text-[86px] font-['playfairDisplay'] mt-20">
          MINIREST
        </h1>
        <p className="font-['caveat'] text-2xl">
          Welcome to the place where your favorite drink gives you a wonderful
          day.
        </p>
      </header>
      <nav className="flex gap-16 font-playfairDisplay absolute bottom-0 mb-48">
        <button onClick={() => handleButtons("home")}>Home</button>
        <button onClick={() => handleButtons("profile")}>Profile</button>
        <button onClick={() => handleButtons("menu")}>Menu</button>
        <button onClick={() => handleButtons("order-history")}>History</button>
      </nav>
    </section>
  );
}

export default HomePage;
