import { useState } from "react";

function ProfilePage() {
  const [isClicked, setIsClicked] = useState(false);

  const handleOnClickEditBtn = () => {
    setIsClicked(!isClicked);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    console.log("submit");
  };

  return (
    <section>
      <h1>Profile</h1>
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
