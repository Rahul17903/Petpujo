import React from "react";
import api from "../api";

const AddToCart = ({ productId }) => {
  const userToken = localStorage.getItem("token");

  const handleAdd = async () => {
    if (!userToken) {
      alert("You must be logged in to add items to cart.");
      return;
    }

    try {
      const response = await api.post(
        "/cart/add",
        { productId }, 
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );

      alert("Product added to cart!");
      console.log("Added to cart:", response.data);
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert(error.response?.data?.msg || "Failed to add to cart.");
    }
  };

  return (
    <button
      className="bg-blue-500 text-white px-4 py-2 mx-2 rounded hover:bg-blue-600 transition"
      onClick={handleAdd}
    >
      Add to Cart
    </button>
  );
};

export default AddToCart;
