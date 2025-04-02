import { useNavigate } from "react-router-dom";

function NotFoundPage() {
  const navigate = useNavigate();
  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <strong className="text-8xl ">404</strong>
      <p className="text-gray-500">Oh no.. page not found {`:(`}</p>
      <button
        className="bg-slate-900 text-gray-200 border-[0.5px] rounded-md mt-9 w-full h-8 max-w-48 border-black"
        onClick={() => navigate("/login")}
      >
        Login
      </button>
    </div>
  );
}
export default NotFoundPage;
