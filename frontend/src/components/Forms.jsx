import { useState } from "react";
import { ProfileCard } from "./Cards";
import axios, { all } from "axios";

const FormLabel = (props) => {
  const { name, value, type, placeholder, handleOnChange } = props;
  return (
    <label>
      <input
        id={name}
        name={name}
        value={value}
        type={type}
        placeholder={placeholder}
        onChange={handleOnChange}
        className="border rounded-md p-2 mb-4"
      />
    </label>
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
      <form onSubmit={handleOnSubmit}>
        <label className="bg-blue-500 hover:bg-blue-900 mb-5 text-white px-4 py-1 rounded cursor-pointer inline-block">
          <input
            type="file"
            name="photo"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />{" "}
          Change image
        </label>
        <FormLabel
          name="username"
          value={username}
          type="text"
          placeholder="Username"
          handleOnChange={(e) => setUsername(e.target.value)}
        />
        <FormLabel
          name="firstName"
          value={firstName}
          type="text"
          placeholder="First Name"
          handleOnChange={(e) => setFirstName(e.target.value)}
        />
        <FormLabel
          name="lastName"
          value={lastName}
          type="text"
          placeholder="Last Name"
          handleOnChange={(e) => setLastName(e.target.value)}
        />
        <FormLabel
          name="birthday"
          value={birthday}
          type="date"
          placeholder="Birthday"
          handleOnChange={(e) => setBirthday(e.target.value)}
        />
        <FormLabel
          name="email"
          value={email}
          type="email"
          placeholder="Email"
          handleOnChange={(e) => setEmail(e.target.value)}
        />
        <FormLabel
          name="allergy"
          value={allergy}
          type="text"
          placeholder="Allergy"
          handleOnChange={(e) => setAllergy(e.target.value)}
        />
      </form>
    </ProfileCard>
  );
}

export { EditProfile };
