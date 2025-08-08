import axios from "axios";
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
        required
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
  const [responseMessage, setResponseMessage] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmitRegisterForm = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:4000/customer/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          firstName,
          lastName,
          birthday,
          allergy,
          tel,
          email,
          password,
        }),
      });

      if (response.status === 201) {
        setResponseMessage("Welcome dear new customer :)");
      }

      if (response.status === 409) {
        setErrorMsg("The username is not available.");
      }
      console.log(response.status);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(responseMessage);

  return (
    <div className="h-screen pb-20 flex flex-col items-center justify-center">
      <h1 className="text-black uppercase text-[86px] font-playfairDisplay">
        MINIREST
      </h1>
      {responseMessage ? (
        <div className="text-center ">
          <p className="text-2xl mt-8 mb-2">{responseMessage}</p>
          <span className="text-xl">
            Go back to{" "}
            <button
              className="underline hover:font-bold "
              onClick={() => navigate("/login")}
            >
              {" "}
              login
            </button>
          </span>
        </div>
      ) : (
        <div className=" flex flex-col justify-center items-center gap-y-10 font-lato ">
          <p className="text-3xl font-bold">Let's be our member!</p>
          <form
            id="register-form"
            className="flex flex-wrap flex-col h-[280px] gap-y-6 gap-x-10"
            onSubmit={handleSubmitRegisterForm}
          >
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
              type="password"
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
          {errorMsg && <p className="text-red-700 font-bold">{errorMsg}</p>}
          <button
            type="submit"
            form="register-form"
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
      )}
    </div>
  );
}

export default RegisterPage;
