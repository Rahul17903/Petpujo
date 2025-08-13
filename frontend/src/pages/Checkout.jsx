import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import api from "../api";
import { useNavigate } from "react-router-dom";
import Payment from "../components/Payment";

const Checkout = () => {
  const [cartItems, setCartItems] = useState([]);
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cod"); // default cash on delivery
  const navigate = useNavigate();
  const userToken = localStorage.getItem("token");

  useEffect(() => {
    const fetchCartItems = async () => {
      if (!userToken) return;
      try {
        const decoded = jwtDecode(userToken);
        const userId = decoded.id || decoded._id;

        const response = await api.get(`/cart/${userId}`, {
          headers: { Authorization: `Bearer ${userToken}` },
        });

        // Filter null products
        const items = response.data.products
          .map((item) => item.productId)
          .filter((p) => p !== null);

        setCartItems(items);
      } catch (err) {
        console.error("Error fetching cart:", err);
      }
    };

    fetchCartItems();
  }, [userToken]);

  const totalPrice = cartItems.reduce((acc, item) => acc + item.price, 0);

  const handlePlaceOrder = async () => {
    if (!address.trim()) {
      alert("Please enter your delivery address.");
      return;
    }

    try {
      const decoded = jwtDecode(userToken);
      const userId = decoded.id || decoded._id;

      const orderData = {
        userId,
        products: cartItems.map((item) => ({
          productId: item._id,
          quantity: 1, // you can add quantity feature later
        })),
        totalAmount: totalPrice,
        address,
        paymentMethod,
      };

      const response = await api.post("/order", orderData, {
        headers: { Authorization: `Bearer ${userToken}` },
      });

      if (response.status === 201) {
        alert("Order placed successfully!");
        navigate("/order"); // redirect to orders page
      }
    } catch (error) {
      console.error("Order failed:", error);
      alert("Something went wrong while placing the order.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg text-black mt-10">
      <h2 className="text-2xl font-bold mb-4">Checkout</h2>

      {/* Cart Summary */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold">Order Summary</h3>
        {cartItems.map((item) => (
          <div key={item._id} className="flex justify-between border-b py-2">
            <p>{item.name}</p>
            <p>₹{item.price}</p>
          </div>
        ))}
        <div className="flex justify-between font-bold text-lg mt-2">
          <p>Total:</p>
          <p>₹{totalPrice}</p>
        </div>
      </div>

      {/* Address */}
      <div className="mb-4">
        <label className="block font-semibold mb-1">Delivery Address:</label>
        <textarea
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="w-full border p-2 rounded"
          placeholder="Enter your full address..."
        ></textarea>
      </div>

      {/* Payment Method */}
      <div className="mb-4">
        <label className="block font-semibold mb-1">Payment Method:</label>
        <select
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
          className="w-full border p-2 rounded"
        >
          <option value="cod">Cash on Delivery</option>
          <option value="online">Online Payment</option>
        </select>
      </div>
        <Payment  cartItems={cartItems} totalPrice={totalPrice} />
      {/* Place Order */}
      <button
        onClick={handlePlaceOrder}
        className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
      >
        Place Order
      </button>
    </div>
  );
};

export default Checkout;
