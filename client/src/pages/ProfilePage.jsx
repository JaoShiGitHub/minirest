import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";

function ProfilePage() {
  const [isClicked, setIsClicked] = useState(false);
  const [userInfo, setUserInfo] = useState({
    username: "",
    firstName: "",
    lastName: "",
    birthday: "",
    tel: "",
    email: "",
    allergy: "",
  });

  useEffect(() => {
    getInfo();
  }, []);

  const getInfo = async () => {
    try {
      const data = await axios(
        "http://localhost:4000/customer/info?customer_id=10"
      );

      setUserInfo((prev) => {
        const updated = { ...prev };

        Object.entries(data.data.data).forEach(([dataKey, dataValue]) => {
          Object.keys(prev).forEach((key) => {
            if (dataKey.toLowerCase() === key.toLowerCase()) {
              updated[key] = dataValue;
            }
          });
        });

        return updated;
      });
    } catch (error) {
      console.log(error);
    }
  };

  const ProfileCard = (props) => {
    return (
      <main className="bg-[#FDFDFA] w-full min-w-[930px] rounded-2xl shadow-lg px-32 py-16 mt-14">
        {props.children}
      </main>
    );
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prev) => ({
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
    console.log("Submit", userInfo.username);
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
                value={userInfo.username}
                type="text"
                onChange={handleChange}
              />
            </section>
            <button type="submit">SUBMIT</button>
          </form>
        ) : (
          <ProfileCard>
            <div className="grid grid-cols-2 gap-x-40">
              <section className="flex flex-col items-center gap-y-4">
                <div className="w-[300px] h-[300px] bg-amber-800 rounded-[35px]">
                  IMAGE
                </div>
                <b>{userInfo?.username}</b>
              </section>
              <section className="grid grid-cols-2">
                <div className="flex flex-col gap-y-4">
                  <b>First Name</b>
                  <b>Last Name</b>
                  <b>Birthday</b>
                  <b>Tel</b>
                  <b>Email</b>
                  <b>Allergy</b>
                </div>
                <div className="flex flex-col gap-y-4">
                  <p>{userInfo?.firstName}</p>
                  <p>{userInfo?.lastName}</p>
                  <p>
                    {userInfo?.birthday
                      ? new Date(userInfo.birthday).toLocaleDateString()
                      : ""}
                  </p>
                  <p>{userInfo?.tel}</p>
                  <p>{userInfo?.email}</p>
                  <p>{userInfo?.allergy}</p>
                </div>
              </section>
            </div>
          </ProfileCard>
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
