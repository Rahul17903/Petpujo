import React, { useContext } from "react";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";

const FoodItem = ({ id, name, price, description, image }) => {
  const { cartItems, addToCart, removeFromCart, url } = useContext(StoreContext);

  return (
    <div className="w-full mx-auto rounded-xl shadow-md transition duration-300 animate-fadeIn">
      {/* Image + Add/Counter */}
      <div className="relative">
        <img
          className="w-full rounded-t-xl"
          src={url + "/images/" + image}
          alt={name}
        />

        {!cartItems[id] ? (
          <img
            className="w-9 absolute bottom-4 right-4 cursor-pointer rounded-full"
            onClick={() => addToCart(id)}
            src={assets.add_icon_white}
            alt="add"
          />
        ) : (
          <div className="absolute bottom-4 right-4 flex items-center gap-2 px-2 py-1 rounded-full bg-white">
            <img
              onClick={() => removeFromCart(id)}
              src={assets.remove_icon_red}
              alt="remove"
              className="w-7 cursor-pointer"
            />
            <p>{cartItems[id]}</p>
            <img
              onClick={() => addToCart(id)}
              src={assets.add_icon_green}
              alt="add"
              className="w-7 cursor-pointer"
            />
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-5">
        <div className="flex justify-between items-center mb-2">
          <p className="text-lg font-medium">{name}</p>
          <img src={assets.rating_starts} alt="rating" className="w-16" />
        </div>
        <p className="text-gray-500 text-xs">{description}</p>
        <p className="text-tomato text-xl font-semibold mt-2">${price}</p>
      </div>
    </div>
  );
};

export default FoodItem;
