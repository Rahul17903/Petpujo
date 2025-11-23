import React, { useState } from "react";
import { assets } from "../../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";

const Add = ({ url }) => {
  const [image, setImage] = useState(false);
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Salad",
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((data) => ({ ...data, [name]: value }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", Number(data.price));
    formData.append("category", data.category);
    formData.append("image", image);

    const response = await axios.post(`${url}/api/food/add`, formData);
    if (response.data.success) {
      setData({
        name: "",
        description: "",
        price: "",
        category: "Salad",
      });
      setImage(false);
      toast.success(response.data.message);
    } else {
      toast.error(response.data.message);
    }
  };

  return (
    <div className="w-[70%] ml-[max(5vw,25px)] mt-12 text-gray-600 text-base">
      <form className="flex flex-col gap-5" onSubmit={onSubmitHandler}>
        {/* Upload Image */}
        <div className="flex flex-col gap-2">
          <p>Upload Image</p>
          <label htmlFor="image" className="cursor-pointer">
            <img
              src={image ? URL.createObjectURL(image) : assets.upload_area}
              alt="Upload Preview"
              className="w-[120px] object-cover border rounded-md"
            />
          </label>
          <input
            onChange={(e) => setImage(e.target.files[0])}
            type="file"
            id="image"
            hidden
            required
          />
        </div>

        {/* Product Name */}
        <div className="flex flex-col gap-2 w-[max(40%,280px)]">
          <p>Product Name</p>
          <input
            onChange={onChangeHandler}
            value={data.name}
            type="text"
            name="name"
            placeholder="Type here"
            className="p-2 border rounded-md"
            required
          />
        </div>

        {/* Product Description */}
        <div className="flex flex-col gap-2 w-[max(40%,280px)]">
          <p>Product Description</p>
          <textarea
            onChange={onChangeHandler}
            value={data.description}
            name="description"
            rows="6"
            placeholder="Write content here"
            className="p-2 border rounded-md"
            required
          ></textarea>
        </div>

        {/* Category & Price */}
        <div className="flex gap-8">
          <div className="flex flex-col gap-2">
            <p>Product Category</p>
            <select
              onChange={onChangeHandler}
              name="category"
              value={data.category}
              className="p-2 border rounded-md max-w-[120px]"
            >
              <option value="Salad">Salad</option>
              <option value="Rolls">Rolls</option>
              <option value="Deserts">Deserts</option>
              <option value="Sandwich">Sandwich</option>
              <option value="Cake">Cake</option>
              <option value="Pure Veg">Pure Veg</option>
              <option value="Pasta">Pasta</option>
              <option value="Noodles">Noodles</option>
              <option value="Biriyani">Biriyani</option>
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <p>Product Price</p>
            <input
              onChange={onChangeHandler}
              value={data.price}
              type="number"
              name="price"
              placeholder="₹20"
              className="p-2 border rounded-md max-w-[120px]"
              required
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="max-w-[120px] p-2 bg-black text-white rounded-md cursor-pointer hover:bg-gray-800"
        >
          ADD
        </button>
      </form>
    </div>
  );
};

export default Add;
