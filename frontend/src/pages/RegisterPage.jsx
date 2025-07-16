import { useState } from "react";
import { useNavigate } from "react-router-dom";

const FormLabel = (props) => {
  const { name, value, type, handleOnChange, placeholder } = props;
  return (
    <label>
      <input
        className="shadow-md min-w-[380px] h-10 p-4 outline-none"
        id={name}
        name={name}
        value={value}
        type={type}
        placeholder={placeholder}
        // placeholder={name.charAt(0).toUpperCase() + name.slice(1)}
        onChange={handleOnChange}
      />
    </label>
  );
};

function RegisterPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthday, setBirthday] = useState("");
  const [allergy, setAllergy] = useState("");
  const [tel, setTel] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="h-screen flex flex-col justify-center items-center gap-y-10 font-lato pb-20">
      <h1 className="text-black uppercase text-[86px] font-playfairDisplay">
        MINIREST
      </h1>
      <p className="text-3xl font-bold">Let's be our member!</p>
      <form className="flex flex-wrap flex-col h-[280px] gap-y-6 gap-x-10">
        <FormLabel
          name="username"
          placeholder="Username"
          value={username}
          type="text"
          handleOnChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <FormLabel
          name="firstName"
          placeholder="First Name"
          value={firstName}
          type="text"
          handleOnChange={(e) => {
            setFirstName(e.target.value);
          }}
        />
        <FormLabel
          name="lastName"
          placeholder="Last Name"
          value={lastName}
          type="text"
          handleOnChange={(e) => {
            setLastName(e.target.value);
          }}
        />
        <FormLabel
          name="birthday"
          placeholder="Birthday"
          value={birthday}
          type="date"
          handleOnChange={(e) => {
            setBirthday(e.target.value);
          }}
        />
        <FormLabel
          name="tel"
          placeholder="Tel."
          value={tel}
          type="text"
          handleOnChange={(e) => {
            setTel(e.target.value);
          }}
        />
        <FormLabel
          name="email"
          placeholder="Email"
          value={email}
          type="text"
          handleOnChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <FormLabel
          name="password"
          placeholder="Password"
          value={password}
          type="text"
          handleOnChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <FormLabel
          name="allergy"
          placeholder="Allergy?"
          value={allergy}
          type="text"
          handleOnChange={(e) => {
            setAllergy(e.target.value);
          }}
        />
      </form>
      <button
        type="submit"
        className="bg-slate-900 hover:bg-zinc-400 text-white w-full h-10 rounded-[3px] border-[0.5px] max-w-[380px] mt-5"
      >
        Register
      </button>
      <p>
        Already have an account?{"  "}
        <button
          className="underline font-bold"
          onClick={() => navigate("/login")}
        >
          Login
        </button>
      </p>
    </div>
  );
}

export default RegisterPage;
