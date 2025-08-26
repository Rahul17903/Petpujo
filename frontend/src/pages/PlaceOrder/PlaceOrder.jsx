import React, { useContext, useEffect, useState } from "react";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const PlaceOrder = () => {
  const { getTotalCartAmount, token, food_list, cartItems, url } = useContext(StoreContext);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const navigate = useNavigate();

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const placeOrder = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!token) {
      toast.error("Please login to place an order");
      setIsSubmitting(false);
      return;
    }

    const orderItems = food_list
      .filter((item) => cartItems[item._id] > 0)
      .map((item) => ({
        id: item._id,
        name: item.name,
        price: item.price,
        quantity: cartItems[item._id],
      }));

    if (orderItems.length === 0) {
      toast.warn("Your cart is empty");
      setIsSubmitting(false);
      return;
    }

    const orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 2,
      paymentMethod,
    };

    try {
      if (paymentMethod === "cod") {
        const codResponse = await axios.post(`${url}/api/order/place-cod`, orderData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (codResponse.data.success) {
          Object.keys(cartItems).forEach(id => {
            cartItems[id] = 0;
          });

          setTimeout(() => {
            toast.success("Order placed successfully!");
          }, 300);
          setTimeout(() => navigate("/myorders"), 1500);
        } else {
          toast.error(codResponse.data.message || "Error placing COD order");
        }
      } else {
        const stripeResponse = await axios.post(`${url}/api/order/place`, orderData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (stripeResponse.data.success && stripeResponse.data.session_url) {
          window.location.href = stripeResponse.data.session_url;
        } else {
          toast.error(stripeResponse.data.message || "Error initiating Stripe checkout");
        }
      }
    } catch (error) {
      console.error("Place order error:", error);
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (!token || getTotalCartAmount() === 0) {
      navigate("/cart");
    }
  }, [token, getTotalCartAmount, navigate]);

  return (
    <form
      onSubmit={placeOrder}
      className="flex items-start justify-between gap-12 mt-24 max-[750px]:flex-col"
    >
      {/* LEFT SIDE FORM */}
      <div className="w-full max-w-[min(100%,500px)]">
        <p className="text-[30px] font-semibold mb-12">Delivery Information</p>
        <div className="flex gap-2">
          <input
            name="firstName"
            onChange={onChangeHandler}
            value={data.firstName}
            placeholder="First name"
            required
            className="mb-4 w-full p-2 border border-gray-300 rounded outline-tomato"
          />
          <input
            name="lastName"
            onChange={onChangeHandler}
            value={data.lastName}
            placeholder="Last name"
            required
            className="mb-4 w-full p-2 border border-gray-300 rounded outline-tomato"
          />
        </div>
        <input
          name="email"
          onChange={onChangeHandler}
          value={data.email}
          type="email"
          placeholder="Email address"
          required
          className="mb-4 w-full p-2 border border-gray-300 rounded outline-tomato"
        />
        <input
          name="street"
          onChange={onChangeHandler}
          value={data.street}
          placeholder="Street"
          required
          className="mb-4 w-full p-2 border border-gray-300 rounded outline-tomato"
        />
        <div className="flex gap-2">
          <input
            name="city"
            onChange={onChangeHandler}
            value={data.city}
            placeholder="City"
            required
            className="mb-4 w-full p-2 border border-gray-300 rounded outline-tomato"
          />
          <input
            name="state"
            onChange={onChangeHandler}
            value={data.state}
            placeholder="State"
            required
            className="mb-4 w-full p-2 border border-gray-300 rounded outline-tomato"
          />
        </div>
        <div className="flex gap-2">
          <input
            name="zipcode"
            onChange={onChangeHandler}
            value={data.zipcode}
            placeholder="Zip code"
            required
            className="mb-4 w-full p-2 border border-gray-300 rounded outline-tomato"
          />
          <input
            name="country"
            onChange={onChangeHandler}
            value={data.country}
            placeholder="Country"
            required
            className="mb-4 w-full p-2 border border-gray-300 rounded outline-tomato"
          />
        </div>
        <input
          name="phone"
          onChange={onChangeHandler}
          value={data.phone}
          type="tel"
          placeholder="Phone"
          required
          className="mb-4 w-full p-2 border border-gray-300 rounded outline-tomato"
        />
      </div>

      {/* RIGHT SIDE */}
      <div className="w-full max-w-[min(100%,500px)]">
        <div className="cart-total">
          <h2 className="text-xl font-semibold">Cart Totals</h2>
          <div>
            <div className="flex justify-between my-2">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="flex justify-between my-2">
              <p>Delivery Fee</p>
              <p>${getTotalCartAmount() === 0 ? 0 : 2}</p>
            </div>
            <hr />
            <div className="flex justify-between my-2 font-bold">
              <b>Total</b>
              <b>${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}</b>
            </div>
          </div>

          {/* PAYMENT METHOD */}
          <div className="mt-5 flex flex-col items-start">
            <div className="font-semibold text-[25px] mb-8">Payment Method</div>

            <label
              className={`border-2 rounded-lg p-2 mb-2 flex items-start cursor-pointer transition-all w-1/2 max-[750px]:w-4/5 ${
                paymentMethod === "cod" ? "bg-orange-50" : "border-gray-300"
              }`}
            >
              <input
                type="radio"
                name="payment"
                value="cod"
                checked={paymentMethod === "cod"}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="appearance-none w-[18px] h-[18px] border-[5px] border-gray-300 rounded-full mr-2 mt-[2px] checked:border-[tomato]"
              />
              COD ( Cash on delivery )
            </label>

            <label
              className={`border-2 rounded-lg p-2 mb-2 flex items-start cursor-pointer transition-all w-1/2 max-[750px]:w-4/5 ${
                paymentMethod === "stripe" ? "border-tomato bg-orange-50" : "border-gray-300"
              }`}
            >
              <input
                type="radio"
                name="payment"
                value="stripe"
                checked={paymentMethod === "stripe"}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="appearance-none w-[18px] h-[18px] border-[5px] border-gray-300 rounded-full mr-2 mt-[2px] checked:border-[tomato]"
              />
              Stripe ( Credit / Debit )
            </label>
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            disabled={isSubmitting || getTotalCartAmount() === 0}
            className="mt-8 bg-tomato text-white px-6 py-3 rounded-md bg-orange-500 disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Processing..." : "Place Order"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
