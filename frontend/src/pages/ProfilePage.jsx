import axios from "axios";
import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
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
      const data = await axios("http://localhost:4000/customer/info", {
        withCredentials: true,
      });

      const user = data?.data?.user_data;
      console.log(user);

      setUserInfo((prev) => {
        const updated = { ...prev };

        Object.entries(user).forEach(([dataKey, dataValue]) => {
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
    <main className="w-full h-screen flex flex-col items-center">
      <NavBar />
      <section className="flex flex-col w-full items-center max-w-[1400px]">
        {isClicked ? (
          <section className="bg-[#FDFDFA] w-full min-w-[930px] rounded-2xl shadow-lg px-32 py-14 mt-14">
            <form onSubmit={handleOnSubmit} className=" grid grid-cols-2">
              <label
                className="hover:cursor-pointer w-[300px] h-[300px] bg-amber-800 rounded-[35px] text-center"
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
              <section className="flex">
                <div className="flex flex-col gap-y-7 min-w-[120px] font-bold font-lato mt-1">
                  <label htmlFor="username">Username </label>
                  <label htmlFor="firstName">First Name </label>
                  <label htmlFor="lastName">Last Name </label>
                  <label htmlFor="birthday">Birthday </label>
                  <label htmlFor="tel">Tel </label>
                  <label htmlFor="email">Email </label>
                  <label htmlFor="allergy">Allergy </label>
                </div>
                <div className="flex flex-col gap-y-5 ">
                  <input
                    className="bg-gray-100 rounded-md px-3 py-1 min-w-[300px]"
                    type="text"
                    name="username"
                    value={userInfo.username}
                    onChange={handleChange}
                  />
                  <input
                    className="bg-gray-100 rounded-md px-3 py-1 min-w-[300px]"
                    type="text"
                    name="firstName"
                    id="firstName"
                    value={userInfo.firstName}
                    onChange={handleChange}
                  />
                  <input
                    className="bg-gray-100 rounded-md px-3 py-1 min-w-[300px]"
                    type="text"
                    name="lastName"
                    id="lastName"
                    value={userInfo.lastName}
                    onChange={handleChange}
                  />
                  <input
                    className="bg-gray-100 rounded-md px-3 py-1 min-w-[300px]"
                    type="date"
                    name="birthday"
                    id="birthday"
                    value={userInfo.birthday}
                    onChange={handleChange}
                  />
                  <input
                    className="bg-gray-100 rounded-md px-3 py-1 min-w-[300px]"
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
                    className="bg-gray-100 rounded-md px-3 py-1 min-w-[300px]"
                    value={userInfo.email}
                    onChange={handleChange}
                  />
                  <input
                    className="bg-gray-100 rounded-md px-3 py-1 min-w-[300px]"
                    type="text"
                    name="allergy"
                    id="allergy"
                    value={userInfo.allergy}
                    onChange={handleChange}
                  />
                </div>
              </section>
              <div className="absolute font-bold right-0 bottom-[-150px] flex gap-x-2">
                <button
                  className="bg-[#3D3D3D] text-white shadow-xl py-2 px-8 rounded-full"
                  onClick={() => setIsClicked(!isClicked)}
                >
                  Cancel
                </button>
                <button
                  className="bg-white shadow-xl py-2 px-8 rounded-full "
                  type="submit"
                >
                  SAVE
                </button>
              </div>
            </form>
          </section>
        ) : (
          <section className="bg-[#FDFDFA] flex justify-between w-full min-w-[930px] rounded-2xl shadow-2xl mt-24">
            <section className="flex flex-col items-center">
              <img
                className="min-w-[620px] min-h-[620px] rounded-l-2xl"
                src="images/user.png"
              />
            </section>
            <section className="flex flex-col justify-center w-full px-28">
              <h1 className="font-bold text-5xl mb-14">{userInfo?.username}</h1>
              <div className="flex text-xl gap-x-10">
                <div className="flex flex-col gap-y-5 min-w-[120px]">
                  <b className="mb-4">Allergy:</b>
                  <b>First Name:</b>
                  <b>Last Name:</b>
                  <b>Birthday:</b>
                  <b>Tel:</b>
                  <b>Email:</b>
                  <b>Location:</b>
                </div>
                <div className="flex flex-col gap-y-5">
                  <p className="mb-4">{userInfo?.allergy || "Null"}</p>
                  <p>{userInfo?.firstName || "Katherien"}</p>
                  <p>{userInfo?.lastName || "Bello"}</p>
                  <p>
                    {userInfo?.birthday
                      ? new Date(userInfo.birthday).toLocaleDateString()
                      : "10 Nov. 2001"}
                  </p>
                  <p>{userInfo?.tel || "0984876577"}</p>
                  <p>{userInfo?.email || "katherien@example.com"}</p>
                  <p>{userInfo?.location || "Null"}</p>
                </div>
              </div>
            </section>
          </section>
        )}
        {isClicked ? null : (
          <button
            className="self-end bg-white hover:bg-orange-200 shadow-lg px-11 py-3 rounded-[50px] font-bold mt-10"
            onClick={handleOnClickEditBtn}
          >
            Edit Profile
          </button>
        )}
      </section>
    </main>
  );
}
// grid grid-cols-2 bg-orange-500

export default ProfilePage;
