import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";

function ProfilePage() {
  const [isClicked, setIsClicked] = useState(false);
  const [formData, setFormData] = useState({
    username: "Lisa555",
    firstName: "Lily",
    lastName: "Hahaha",
    birthday: "",
    tel: "0981919110",
    email: "lily55@test.com",
    allergy: "-",
  });

  const ProfileCard = (props) => {
    return (
      <main className="bg-[#FDFDFA] w-full min-w-[930px] rounded-2xl shadow-lg px-32 py-16 mt-14">
        {props.children}
      </main>
    );
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleOnClickEditBtn = () => {
    setIsClicked(!isClicked);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    setIsClicked(!isClicked);
    console.log("Submit", formData.username);
  };

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <NavBar />
      <section className="flex flex-col w-full items-center max-w-[1180px] gap-6">
        {isClicked ? (
          <form onSubmit={handleOnSubmit}>
            <section>
              <label htmlFor="username">Username</label>
              <input
                name="username"
                value={formData.username}
                type="text"
                onChange={handleChange}
              />
            </section>
            <button type="submit">SUBMIT</button>
          </form>
        ) : (
          <section>
            <p>Username: {formData.username}</p>
          </section>
        )}
        {isClicked ? null : (
          <button
            className="self-end bg-white shadow-lg w-28 h-10 rounded-[50px] font-bold"
            onClick={handleOnClickEditBtn}
          >
            Edit
          </button>
        )}
      </section>
    </div>
  );
}

export default ProfilePage;
