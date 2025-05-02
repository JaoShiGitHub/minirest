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
        console.log(userInfo);

        localStorage.setItem("userInfo", JSON.stringify(userInfo));
        return updated;
      });

      console.log(userInfo);
    } catch (error) {
      console.log(error);
    }
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

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        `http://localhost:4000/customer/edit?customer_id=10`,
        userInfo
      );

      console.log("Update successfully ", response);
    } catch (error) {
      console.log(error);
    }
    setIsClicked(!isClicked);
    console.log("Submit", userInfo);
  };

  return (
    <main className="w-full h-screen flex items-center justify-center">
      <NavBar />
      <section className="flex flex-col w-full items-center max-w-[1180px] gap-6">
        {isClicked ? (
          <section className="bg-[#FDFDFA] w-full min-w-[930px] rounded-2xl shadow-lg px-32 py-16 mt-14">
            <form onSubmit={handleOnSubmit} className="grid grid-cols-2">
              <label
                className="hover:cursor-pointer w-[300px] h-[300px] bg-amber-800 rounded-[35px]"
                htmlFor="profile-image"
              >
                Choose Image
              </label>
              <input
                type="file"
                accept="image/*"
                // onChange={handleImageChange}
                id="profile-image"
                hidden
              />
              <section className=" flex">
                <div className="flex flex-col gap-y-4">
                  <label htmlFor="username">Username </label>
                  <label htmlFor="firstName">First Name </label>
                  <label htmlFor="lastName">Last Name </label>
                  <label htmlFor="birthday">Birthday </label>
                  <label htmlFor="tel">Tel </label>
                  <label htmlFor="email">Email </label>
                  <label htmlFor="allergy">Allergy </label>
                </div>
                <div className="flex flex-col gap-y-4">
                  <input
                    type="text"
                    name="username"
                    className="bg-gray-100 rounded-md px-3 py-1"
                    value={userInfo.username}
                    onChange={handleChange}
                  />
                  <input
                    type="text"
                    name="firstName"
                    id="firstName"
                    value={userInfo.firstName}
                    onChange={handleChange}
                  />
                  <input
                    type="text"
                    name="lastName"
                    id="lastName"
                    value={userInfo.lastName}
                    onChange={handleChange}
                  />
                  <input
                    type="date"
                    name="birthday"
                    id="birthday"
                    value={userInfo.birthday}
                    onChange={handleChange}
                  />
                  <input
                    type="text"
                    name="tel"
                    id="tel"
                    value={userInfo.tel}
                    onChange={handleChange}
                  />
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={userInfo.email}
                    onChange={handleChange}
                  />
                  <input
                    type="text"
                    name="allergy"
                    id="allergy"
                    value={userInfo.allergy}
                    onChange={handleChange}
                  />
                </div>
              </section>
              <button type="submit">SUBMIT</button>
            </form>
          </section>
        ) : (
          <section className="bg-[#FDFDFA] w-full min-w-[930px] rounded-2xl shadow-lg px-32 py-16 mt-14">
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
    </main>
  );
}

export default ProfilePage;
