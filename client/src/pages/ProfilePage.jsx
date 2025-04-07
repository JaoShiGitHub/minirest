import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";

function ProfilePage() {
  const [isClicked, setIsClicked] = useState(false);
  const [profile, setProfile] = useState({});
  const navigate = useNavigate();
  // image states
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [imageName, setImageName] = useState("");
  // input states
  const [formData, setFormData] = useState({
    username: "",
    firstname: "",
    lastname: "",
    tel: "",
    email: "",
    allergy: "",
    birthday: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setImageName(file.name);
    }
  };

  const handleOnClickEditBtn = () => {
    setIsClicked(!isClicked);
  };

  useEffect(() => {
    getProfile();
  }, []);

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
      console.log("Submitting image:", imageName, imageFile);
      navigate("/profile");
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  const getProfile = async () => {
    try {
      const data = await axios.get(
        `http://localhost:4000/customer/info?customer_id=10`
      );

      setProfile(data?.data?.data);
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

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <NavBar />
      <section className="flex flex-col w-full items-center max-w-[1180px] gap-6">
        {isClicked ? (
          <ProfileCard>
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
                onChange={handleImageChange}
                id="profile-image"
                hidden
              />
              <section className="grid grid-cols-2 gap-y-4">
                <div className="flex flex-col gap-y-4">
                  <label htmlFor="username">Username </label>
                  <label htmlFor="first-name">First Name </label>
                  <label htmlFor="last-name">Last Name </label>
                  <label htmlFor="birthday">Birthday </label>
                  <label htmlFor="tel">Tel </label>
                  <label htmlFor="email">Email </label>
                  <label htmlFor="allergy">Allergy </label>
                </div>
                <div className="flex flex-col gap-y-4">
                  <input
                    type="text"
                    name="username"
                    id="username"
                    className="bg-gray-100 rounded-md px-3 py-1"
                  />
                  <input
                    type="text"
                    name="first-name"
                    id="first-name"
                    value={formData.firstname}
                    onChange={handleChange}
                  />
                  <input
                    type="text"
                    name="last-name"
                    id="last-name"
                    value={formData.lastname}
                    onChange={handleChange}
                  />
                  <input
                    type="date"
                    name="birthday"
                    id="birthday"
                    value={formData.birthday}
                    onChange={handleChange}
                  />
                  <input
                    type="text"
                    name="tel"
                    id="tel"
                    value={formData.tel}
                    onChange={handleChange}
                  />
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                  <input
                    type="text"
                    name="allergy"
                    id="allergy"
                    value={formData.allergy}
                    onChange={handleChange}
                  />
                </div>
              </section>
            </form>
          </ProfileCard>
        ) : (
          <ProfileCard>
            <div className="grid grid-cols-2 gap-x-40">
              <section className="flex flex-col items-center gap-y-4">
                <div className="w-[300px] h-[300px] bg-amber-800 rounded-[35px]">
                  IMAGE
                </div>
                <b>{profile?.username}</b>
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
                  <p>{profile?.firstname}</p>
                  <p>{profile?.lastname}</p>
                  <p>
                    {profile?.birthday
                      ? new Date(profile.birthday).toLocaleDateString()
                      : ""}
                  </p>
                  <p>{profile?.tel}</p>
                  <p>{profile?.email}</p>
                  <p>{profile?.allergy}</p>
                </div>
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
