import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import api from "../api";
import { Link, useParams } from "react-router-dom";
import placeholderImg from '../assets/2.jpg';
import { FaStar } from "react-icons/fa";
import Checkout from "../pages/Checkout";

const CartList = () => {
  const userToken = localStorage.getItem("token");
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      if (!userToken) return;

      try {
        const decoded = jwtDecode(userToken);
        const userId = decoded.id || decoded._id;

        const response = await api.get(`/cart/${userId}`, {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        });

        //  Filter out null product references
        const cartItems = response.data.products
          .map(item => item.productId)
          .filter(product => product !== null);

        setProducts(cartItems);
        console.log("Filtered Cart Items:", cartItems);
      } catch (err) {
        console.error("Error fetching user data:", err);
      }
    };

    fetchUser();
  }, [userToken]);

const handleDelete = async (productId) => {
  try {
    const decoded = jwtDecode(userToken);
    const userId = decoded.id || decoded._id;

    await api.delete(`/cart/${productId}`, {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });

    setProducts(prev => prev.filter(p => p._id !== productId));

  } catch (error) {
    console.error("Cannot delete Cart Product:", error);
  }
};


  return (
    <div className="flex flex-row flex-wrap gap-7 p-7 m-auto items-center justify-center bg-white min-h-screen text-black">
      {products.length === 0 ? (
        <p className="text-gray-500 text-xl">No products in cart.</p>
      ) : (
        products.map((product) => (<div key={product._id} className="flex flex-col border border-gray-300 rounded">
          <Link to={`/get-product/${product._id}`} >
            <div className="w-[350px] p-2 bg-white/20 rounded-lg hover:bg-white/30 hover:shadow-2xl hover:border border-gray-200 transition-all duration-200">
              <img
                src={
                  product.image
                    ? `${import.meta.env.VITE_BACKEND_URL}${product.image}`
                    : placeholderImg
                }
                alt={product.name}
                className="w-[350px] h-[300px] object-cover rounded-lg hover:scale-105 transition-transform duration-300"
              />
              <div className="flex justify-between pt-1">
                <h4 className="text-lg">{product.name}</h4>
                <p className="bg-green-500 px-3 rounded text-white flex gap-1 items-center">
                  {product.rating || "4.5"} <FaStar className="h-2" />
                </p>
              </div>
              <div className="flex flex-row justify-between text-gray-600">
                <p className="truncate w-[60%]">{product.description}</p>
                <p className="text-gray-500">₹{product.price} for one</p>
              </div>
            </div>
          </Link>
          <button className="bg-red-500 p-2 rounded cursor-pointer" onClick={()=>handleDelete(product._id)}>Delete</button>
          <Link to='/checkout'><button className="bg-green-500 p-2 rounded cursor-pointer">Buy Now</button></Link>
        </div>))
      )}
    </div>
  );
};

export default CartList;
