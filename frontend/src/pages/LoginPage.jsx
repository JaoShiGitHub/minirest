import { useState } from "react";
import { useAuth } from "../contexts/Authentication";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";

function LoginPage() {
  const navigate = useNavigate();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const { login, loading, setLoading } = useAuth();

  setLoading(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    try {
      setLoading(true);
      await login({
        identifier,
        password,
      });
      navigate("/home");
      setLoading(false);
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage("An unexpected error occurred. Please try again.");
      }
    }
  };
  console.log(loading);

  return (
    <section className="flex flex-col items-center h-screen">
      <div className="flex flex-col items-center mt-24">
        <h1 className="text-black  uppercase text-[86px] font-playfairDisplay">
          Minirest
        </h1>
        <p className="font-['caveat'] text-2xl">
          Come back to where you can feel positive energy and enjoy your
          favourite drink.
        </p>
      </div>
      {loading ? (
        <Loading />
      ) : (
        <div className="w-full flex flex-col items-center gap-y-20 pt-10 max-h-[400px]">
          <form
            className="bg-background w-full max-w-[400px] flex flex-col items-center mt-12"
            onSubmit={handleSubmit}
          >
            <label htmlFor="identifier"></label>
            <input
              className="w-full h-10 shadow-lg outline-none rounded-[3px] placeholder:text-sm px-4 mb-[16px]"
              id="identifier"
              name="identifier"
              type="text"
              placeholder="Username | Email"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
            />

            <label htmlFor="password"></label>
            <input
              className="w-full h-10 shadow-lg outline-none rounded-[3px] placeholder:text-sm px-4 mb-9"
              id="password"
              name="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              type="submit"
              className="bg-slate-900 hover:bg-zinc-400 text-white w-full h-10 rounded-[3px] border-[0.5px]"
            >
              Login
            </button>
            {errorMessage && <p>{errorMessage}</p>}
          </form>

          <p className="">
            Are you new here? Let’s{" "}
            <button
              className="underline font-bold "
              onClick={() => navigate("/register")}
            >
              register!
            </button>
          </p>
        </div>
      )}
    </section>
  );
}

export default LoginPage;
