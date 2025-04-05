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

  return (
    <section>
      <NavBar />
      {isClicked ? (
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
          <button type="submit">SUBMIT</button>
        </form>
      ) : (
        <div>
          <p>Username: oshinIsSoCutee</p>
          <p>First Name: Shi</p>
          <p>Last Name: JaoShi</p>
          <p>Tel: 0984876577</p>
          <p>Email: oshin.ganjanapas@gmail.com</p>
          <p>Allergy: -</p>
          <p>Birthday: 2001-11-10</p>
          <button onClick={handleOnClickEditBtn}>Edit</button>
        </div>
      )}
    </section>
  );
}

export default ProfilePage;
