import { useState } from "react";
import { ProfileCard } from "./Cards";
import axios from "axios";
import { useEditProfile } from "../pages/ProfilePage";

function EditProfile(props) {
  const { setIsClicked } = useEditProfile();
  const {
    current_username,
    current_firstName,
    current_lastName,
    current_birthday,
    current_email,
    current_allergy,
    current_location,
    current_tel,
    current_image,
  } = props;

  const [username, setUsername] = useState(current_username);
  const [firstName, setFirstName] = useState(current_firstName);
  const [lastName, setLastName] = useState(current_lastName);
  const [birthday, setBirthday] = useState(current_birthday);
  const [email, setEmail] = useState(current_email);
  const [allergy, setAllergy] = useState(current_allergy);
  const [location, setLocation] = useState(current_location);
  const [tel, setTel] = useState(current_tel);
  const [image, setImage] = useState(current_image);
  //   other states
  const [newImage, setNewImage] = useState(null);
  const [editProfileMessage, setEditProfileMessage] = useState("");

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    const image = newImage || "";
    try {
      const response = await axios.put(
        "http://localhost:4000/customer/edit",
        {
          username,
          firstName,
          lastName,
          birthday,
          email,
          allergy,
          image,
          location,
          tel,
        },
        {
          withCredentials: true,
        }
      );

      console.log("Update successfully ", response);
      // setEditProfileMessage("Update successfully");
      setIsClicked(false);
    } catch (error) {
      console.log(error);
    }
    // console.log("Submit", userInfo);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setImage(imageURL);

      const reader = new FileReader();
      reader.onloadend = () => {
        setNewImage(reader.result); // base64 string (works only after loading)
      };
      reader.readAsDataURL(file); // converts file to base64 (starts the loading)
    }
  };

  const formatDate = (isoString) => {
    return isoString?.split("T")[0]; // "1992-08-07"
  };

  return (
    <section className="flex flex-col">
      {editProfileMessage ? <p>{editProfileMessage}</p> : null}
      <ProfileCard>
        <img
          src={image || "images/profile_img.png"}
          alt={current_username}
          className="min-w-[500px] max-h-[500px] rounded-2xl ml-20 shadow-lg"
        />
        <form
          id="edit-profile"
          onSubmit={handleOnSubmit}
          className="w-full flex items-start"
        >
          <div className="flex flex-wrap gap-y-6 flex-col gap-x-10 w-full h-[600px] p-14">
            <FormLabel
              name="username"
              label="Username"
              value={username}
              type="text"
              placeholder="Username"
              handleOnChange={(e) => setUsername(e.target.value)}
            />
            <FormLabel
              name="firstName"
              label="First Name"
              value={firstName}
              type="text"
              placeholder="First Name"
              handleOnChange={(e) => setFirstName(e.target.value)}
            />
            <FormLabel
              name="lastName"
              label="Last Name"
              value={lastName}
              type="text"
              placeholder="Last Name"
              handleOnChange={(e) => setLastName(e.target.value)}
            />
            <FormLabel
              name="birthday"
              label="Birthday date"
              value={formatDate(birthday)}
              type="date"
              placeholder="Birthday"
              handleOnChange={(e) => setBirthday(e.target.value)}
            />
            <FormLabel
              name="email"
              label="Email"
              value={email}
              type="email"
              placeholder="Email"
              handleOnChange={(e) => setEmail(e.target.value)}
            />
            <FormLabel
              name="tel"
              label="Tel"
              value={tel}
              type="text"
              placeholder="Tel"
              handleOnChange={(e) => setTel(e.target.value)}
            />
            <FormLabel
              name="allergy"
              label="Allergy"
              value={allergy}
              type="text"
              placeholder="Allergy"
              handleOnChange={(e) => setAllergy(e.target.value)}
            />
            <FormLabel
              name="location"
              label="Location"
              value={location}
              type="text"
              placeholder="Location"
              handleOnChange={(e) => setLocation(e.target.value)}
            />
            <label className="hover:bg-amber-700 shadow-xl bg-orange-200 hover:text-yellow-50 text-black font-bold text-center mt-10 p-2 min-w-[280px] rounded cursor-pointer inline-block">
              <input
                type="file"
                name="photo"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
              Change Image
            </label>
          </div>
        </form>
      </ProfileCard>
      <div className="self-end text-xl mt-10">
        <button
          className="bg-slate-800 hover:bg-amber-700 hover:text-yellow-5 text-white shadow-lg py-2 px-2 rounded-full min-w-32"
          onClick={() => setIsClicked(false)}
        >
          Cancel
        </button>
        <button
          className="bg-white hover:bg-amber-700 hover:text-yellow-50 shadow-lg py-2 px-2 rounded-full min-w-32 ml-7"
          type="submit"
          form="edit-profile"
        >
          Save
        </button>
      </div>
    </section>
  );
}

const FormLabel = (props) => {
  const { name, label, value, type, placeholder, handleOnChange } = props;
  return (
    <div className="flex flex-col gap-2">
      <label className="font-bold">{label}:</label>
      <input
        id={name}
        name={name}
        value={value}
        type={type}
        placeholder={placeholder}
        onChange={handleOnChange}
        className="border rounded-md p-2  min-w-[280px] shadow-sm"
      />
    </div>
  );
};

export { EditProfile, FormLabel };
