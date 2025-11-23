import React, { useContext } from "react";
import { StoreContext } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cartItems, food_list, removeFromCart, getTotalCartAmount, url } =
    useContext(StoreContext);
  const navigate = useNavigate();

  return (
    <div className="mt-[100px]">
      {/* Cart Items */}
      <div className="cart-items">
        {/* Header Row */}
        <div className="grid grid-cols-[1fr_1.5fr_1fr_1fr_1fr_0.5fr] items-center text-gray-500 text-[max(1vw,12px)]">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr className="h-[1px] bg-[#e2e2e2] border-none" />

        {/* Cart Items */}
        {food_list.map((item, index) => {
          if (cartItems[item._id] > 0) {
            return (
              <div key={index}>
                <div className="grid grid-cols-[1fr_1.5fr_1fr_1fr_1fr_0.5fr] items-center text-black my-[10px]">
                  <img
                    src={url + "/images/" + item.image}
                    alt=""
                    className="w-[50px]"
                  />
                  <p>{item.name}</p>
                  <p>₹{item.price}</p>
                  <p>{cartItems[item._id]}</p>
                  <p>₹{item.price * cartItems[item._id]}</p>
                  <p
                    onClick={() => removeFromCart(item._id)}
                    className="cursor-pointer"
                  >
                    x
                  </p>
                </div>
                <hr className="h-[1px] bg-[#e2e2e2] border-none" />
              </div>
            );
          }
          return null;
        })}
      </div>

      {/* Cart Bottom */}
      <div className="mt-[80px] flex justify-between gap-[max(12vw,20px)] max-[750px]:flex-col-reverse">
        {/* Cart Totals */}
        <div className="flex-1 flex flex-col gap-5">
          <h2 className="text-xl font-semibold">Cart Totals</h2>
          <div>
            <div className="flex justify-between text-[#555]">
              <p>Subtotal</p>
              <p>₹{getTotalCartAmount()}</p>
            </div>
            <hr className="my-[10px]" />
            <div className="flex justify-between text-[#555]">
              <p>Delivery Fee</p>
              <p>₹{getTotalCartAmount() === 0 ? 0 : 2}</p>
            </div>
            <hr className="my-[10px]" />
            <div className="flex justify-between text-[#555] font-bold">
              <b>Total</b>
              <b>
                ₹
                {getTotalCartAmount() === 0
                  ? 0
                  : getTotalCartAmount() + 2}
              </b>
            </div>
          </div>
          <button
            onClick={() => navigate("/order")}
            className="border-none text-white bg-[tomato] w-[max(15vw,200px)] py-3 rounded-md cursor-pointer"
          >
            PROCEED TO CHECKOUT
          </button>
        </div>

        {/* Promo Code Section */}
        <div className="flex-1">
          <p className="text-[#555]">
            If you have a promo code, Enter it here
          </p>
          <div className="mt-2 flex justify-between items-center bg-[#eaeaea] rounded-md">
            <input
              type="text"
              placeholder="promo code"
              className="bg-transparent border-none outline-none pl-2 flex-1"
            />
            <button className="w-[max(10vw,150px)] py-3 px-2 bg-black text-white rounded-md">
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
