import { FormLabel } from "../components/EditProfileForm";
import NavBar from "../components/NavBar";
import { useState } from "react";
import axios from "axios";

function InsertMenu() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [details, setDetails] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [previewImage, setPreviewImage] = useState(null);
  const [productImage, setProductImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // image to display
      const imageURL = URL.createObjectURL(file);
      setPreviewImage(imageURL);

      //   image to send to database
      const reader = new FileReader();
      reader.onloadend = () => {
        setProductImage(reader.result); // base64 string (works only after loading)
      };
      reader.readAsDataURL(file); // converts file to base64 (starts the loading)
    }
  };

  const handleOnSubmit = async () => {
    try {
      const image = productImage;
      const response = await axios.post(
        "http://localhost:4000/menu/insert",
        { name, price, details, ingredients, image },
        { withCredentials: true }
      );
      console.log("Insert successfully ", response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <NavBar />
      <p className="text-3xl font-bold my-10"> CREATE NEW PRODUCT</p>
      <section className="flex gap-x-20 items-center">
        {previewImage ? (
          <img
            src={previewImage}
            alt={name}
            className=" h-[450px] rounded-xl"
          />
        ) : (
          <div className="bg-orange-950 w-[450px] h-[450px] text-white font-bold rounded-xl flex items-center justify-center">
            <span className="text-xl">Image</span>
          </div>
        )}
        <form
          className="flex flex-col gap-4 w-full max-w-md p-6 min-w-[400px]"
          onSubmit={handleOnSubmit}
        >
          <FormLabel
            name="name"
            label="Name"
            value={name}
            type="text"
            placeholder="Product Name"
            handleOnChange={(e) => setName(e.target.value)}
          />
          <FormLabel
            name="price"
            label="Price"
            value={price}
            type="number"
            placeholder="Price"
            handleOnChange={(e) => setPrice(e.target.value)}
          />
          <FormLabel
            name="details"
            label="Details"
            value={details}
            type="text"
            placeholder="Details"
            handleOnChange={(e) => setDetails(e.target.value)}
          />
          <FormLabel
            name="ingredients"
            label="Ingredients"
            value={ingredients}
            type="text"
            placeholder="Ingredients"
            handleOnChange={(e) => setIngredients(e.target.value)}
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
          <button
            type="submit"
            className="bg-white text-black font-bold px-4 py-2 rounded hover:text-white hover:bg-slate-800 transition-colors duration-300 mt-4 shadow-xl"
          >
            Insert Menu Item
          </button>
        </form>
      </section>
    </div>
  );
}

export default InsertMenu;
