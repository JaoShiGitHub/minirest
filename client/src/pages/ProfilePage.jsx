import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";

function ProfilePage() {
  const [isClicked, setIsClicked] = useState(false);
  const navigate = useNavigate();

  const handleOnClickEditBtn = () => {
    setIsClicked(!isClicked);
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const username = formData.get("username");
    const firstname = formData.get("first-name");
    const lastname = formData.get("last-name");
    const tel = formData.get("tel");
    const email = formData.get("email");
    const allergy = formData.get("allergy");
    const birthday = formData.get("birthday");

    try {
      const response = await axios.put(
        "http://localhost:4000/edit-customer-info?customer_id=10",
        {
          username: username,
          firstname: firstname,
          lastname: lastname,
          tel: tel,
          email: email,
          allergy: allergy,
          birthday: birthday,
        }
      );
      console.log("Update successfully ", response);
      navigate("/profile");
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  const ProfileCard = (props) => {
    return (
      <main className="bg-[#FDFDFA] w-full rounded-2xl shadow-lg px-32 py-16 mt-14">
        {props.children}
      </main>
    );
  };

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <NavBar />
      <section className="flex flex-col w-full items-center max-w-[1180px] gap-6">
        {isClicked ? (
          <ProfileCard>
            <form onSubmit={handleOnSubmit}>
              <label htmlFor="username">Username </label>
              <input type="text" name="username" id="username" />
              <br />
              <label htmlFor="first-name">First Name </label>
              <input type="text" name="first-name" id="first-name" />
              <br />
              <label htmlFor="last-name">Last Name </label>
              <input type="text" name="last-name" id="last-name" />
              <br />
              <label htmlFor="tel">Tel </label>
              <input type="text" name="tel" id="tel" />
              <br />
              <label htmlFor="email">Email </label>
              <input type="email" name="email" id="email" />
              <br />
              <label htmlFor="allergy">Allergy </label>
              <input type="text" name="allergy" id="allergy" />
              <br />
              <label htmlFor="birthday">Birthday </label>
              <input type="date" name="birthday" id="birthday" />
              <br />
              <br />
            </form>
          </ProfileCard>
        ) : (
          <ProfileCard>
            <div className="flex justify-evenly gap-x-40">
              <section className="flex flex-col items-center gap-y-4">
                <div className="w-[300px] h-[300px] bg-amber-800 rounded-[35px]">
                  IMAGE
                </div>
                <b>oshinIsSoCutee</b>
              </section>
              <section className="flex flex-col gap-y-3">
                <p>First Name: Shi</p>
                <p>Last Name: JaoShi</p>
                <p>Tel: 0984876577</p>
                <p>Birthday: 2001-11-10</p>
                <p>Email: oshin.ganjanapas@gmail.com</p>
                <p>Allergy: -</p>
              </section>
            </div>
          </ProfileCard>
        )}

        {isClicked ? (
          <button type="submit">SUBMIT</button>
        ) : (
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

// <p>First Name: Shi</p>
// <p>Last Name: JaoShi</p>
// <p>Tel: 0984876577</p>
// <p>Birthday: 2001-11-10</p>
// <p>Email: oshin.ganjanapas@gmail.com</p>
// <p>Allergy: -</p>
