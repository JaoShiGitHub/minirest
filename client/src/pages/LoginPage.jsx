import { useState } from "react";
import { useAuth } from "../contexts/Authentication";

function LoginPage() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useAuth(); // Call the hook directly

  const handleSubmit = (e) => {
    e.preventDefault();
    login({
      identifier,
      password,
    });
  };

  return (
    <section className="flex flex-col items-center">
      <div className="flex flex-col items-center mt-24">
        <h1 className="text-black  uppercase text-[86px] font-['playfairDisplay']">
          Minirest
        </h1>
        <p className="font-['caveat'] text-2xl">
          Come back to where you can feel positive energy and enjoy your
          favourite drink.
        </p>
      </div>
      <form
        className="bg-background w-full max-w-[400px] h-screen flex flex-col items-center mt-12"
        onSubmit={handleSubmit}
      >
        <label htmlFor="identifier"> </label>
        <input
          className="w-full h-10 border-black border-[0.5px] rounded-[3px] placeholder:text-sm px-2 mb-[16px]"
          id="identifier"
          name="identifier"
          type="text"
          placeholder="Username | Email"
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
        />

        <label htmlFor="password"></label>
        <input
          className="w-full h-10 border-black border-[0.5px] rounded-[3px] placeholder:text-sm placeholder:text-['placeholder'] px-2 mb-[38px]"
          id="password"
          name="password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          className="bg-slate-900 text-white w-full h-10 rounded-[3px] border-[0.5px]"
        >
          Login
        </button>
      </form>
      <p className="pb-56">
        Are you new here? Let’s <button className="underline">register!</button>
      </p>
    </section>
  );
}

export default LoginPage;
