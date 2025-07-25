import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import { ProfileCard } from "../components/Cards";
import { EditProfile } from "../components/Forms";
import { WhiteButton } from "../components/Buttons";
import { useAuth } from "../contexts/Authentication";

const EditProfileContext = React.createContext();

function ProfilePage() {
  const navigate = useNavigate();
  const { logout } = useAuth();
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

  const handleOnClickLogout = async () => {
    try {
      await logout();
      console.log("Logout successful");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const handleOnclickDeleteAccount = async () => {
    try {
      const response = await axios.delete(
        "http://localhost:4000/customer/delete",
        { withCredentials: true }
      );
      console.log(response);
      navigate("/login");
    } catch (error) {
      console.error("Error deleting account:", error);
    }
  };

  const handleOnClickEditBtn = () => {
    setIsClicked(!isClicked);
  };

  return (
    <EditProfileContext.Provider value={{ isClicked, setIsClicked }}>
      <main className="w-full min-h-screen flex flex-col items-center pb-40">
        <NavBar />
        <section className="flex flex-col w-full items-center max-w-[1400px]">
          {isClicked ? (
            <EditProfile
              current_username={userInfo?.username}
              current_firstName={userInfo?.firstName}
              current_lastName={userInfo?.lastName}
              current_birthday={userInfo?.birthday}
              current_email={userInfo?.email}
              current_allergy={userInfo?.allergy}
              current_location=""
              current_tel={userInfo?.tel}
            />
          ) : (
            <ProfileCard>
              <section className="flex flex-col items-center">
                <img
                  className="min-w-[620px] min-h-[620px] rounded-l-2xl"
                  src="images/user.png"
                />
              </section>
              <section className="flex flex-col justify-center w-full px-28">
                <h1 className="font-bold text-5xl mb-14">
                  {userInfo?.username}
                </h1>
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
            </ProfileCard>
          )}
          {isClicked ? null : (
            <div className="self-end flex mt-10 gap-x-10">
              <WhiteButton onClick={handleOnclickDeleteAccount}>
                Delete Account
              </WhiteButton>
              <WhiteButton onClick={handleOnClickLogout}>Logout</WhiteButton>
              <WhiteButton onClick={handleOnClickEditBtn}>
                Edit Profile
              </WhiteButton>
            </div>
          )}
        </section>
      </main>
    </EditProfileContext.Provider>
  );
}

export const useEditProfile = () => React.useContext(EditProfileContext);

export default ProfilePage;
