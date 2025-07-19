import { useNavigate } from "react-router-dom";

function ButtonHomePage({ page }) {
  const navigate = useNavigate();

  const handleButtons = () => {
    navigate(`/${page.toLowerCase()}`);
  };

  return (
    <button
      className="hover:underline hover:font-semibold"
      onClick={handleButtons}
    >
      {page}
    </button>
  );
}

function WhiteButton({ onClick, children }) {
  return (
    <button
      className="bg-white hover:bg-orange-200 shadow-lg px-11 py-3 rounded-full font-bold w-44"
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export { ButtonHomePage, WhiteButton };
