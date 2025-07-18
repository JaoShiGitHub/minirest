import { lazy, useState } from "react";
import { ProfileCard } from "./Cards";
import axios, { all } from "axios";

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
        className="border rounded-md p-2  min-w-[280px]"
      />
    </div>
  );
};

function EditProfile(props) {
  const {
    current_username,
    current_firstName,
    current_lastName,
    current_birthday,
    current_email,
    current_allergy,
  } = props;

  const [username, setUsername] = useState(current_username);
  const [firstName, setFirstName] = useState(current_firstName);
  const [lastName, setLastName] = useState(current_lastName);
  const [birthday, setBirthday] = useState(current_birthday);
  const [email, setEmail] = useState(current_email);
  const [allergy, setAllergy] = useState(current_allergy);
  //   other states
  const [previewImage, setPreviewImage] = useState(null);
  const [newImage, setNewImage] = useState(null);

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    const image = newImage || "";
    try {
      const response = await axios.put(
        "http://localhost:4000/customer/edit",
        { username, firstName, lastName, birthday, email, allergy, image },
        {
          withCredentials: true,
        }
      );

      console.log("Update successfully ", response);
    } catch (error) {
      console.log(error);
    }

    // console.log("Submit", userInfo);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setPreviewImage(imageURL);

      const reader = new FileReader();
      reader.onloadend = () => {
        setNewImage(reader.result); // base64 string (works only after loading)
      };
      reader.readAsDataURL(file); // converts file to base64 (starts the loading)
    }
  };

  return (
    <ProfileCard>
      <img
        src={previewImage}
        alt={current_username}
        className="min-w-[500px] max-h-[500px] rounded-2xl ml-20 shadow-xl"
      />
      <form
        onSubmit={handleOnSubmit}
        className="w-full flex items-start text-lg"
      >
        <div className="flex flex-wrap gap-y-6 flex-col gap-x-10 p-20 w-full h-[600px]">
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
            value={birthday}
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
            value={allergy}
            type="text"
            placeholder="Allergy"
            handleOnChange={(e) => setAllergy(e.target.value)}
          />
          <label className="hover:bg-amber-700 shadow-xl bg-orange-200 hover:text-yellow-50 text-black font-bold text-center mt-10 p-2 min-w-[280px] rounded cursor-pointer inline-block">
            <input
              type="file"
              name="photo"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />{" "}
            Change Image
          </label>
        </div>
      </form>
    </ProfileCard>
  );
}

export { EditProfile };
