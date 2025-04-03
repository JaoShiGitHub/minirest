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

export default ButtonHomePage;
