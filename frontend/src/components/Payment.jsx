import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import api from "../api";

export default function Payment({ cartItems, totalPrice }) {
  const [token, setToken] = useState("");
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const t = localStorage.getItem("token");
    if (t) {
      setToken(t);
      const decoded = jwtDecode(t);
      setUserId(decoded.id || decoded._id);
    }
  }, []);

  const handlePayment = async () => {
    try {
      // 🛠 Send amount & products with price to backend
      const { data } = await api.post(
        "/payment/order",
        {
          amount: totalPrice,
          products: cartItems.map((item) => ({
            productId: item._id,
            quantity: 1,
            price: item.price,
          })),
          userId
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const razorpayOrder = data.razorpayOrder;

      // Razorpay Checkout
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: razorpayOrder.amount,
        currency: razorpayOrder.currency,
        name: "Food App",
        description: "Order Payment",
        order_id: razorpayOrder.id,
        handler: async function (response) {
          const verifyRes = await api.post(
            "/payment/verify",
            response,
            { headers: { Authorization: `Bearer ${token}` } }
          );
          if (verifyRes.data.success) {
            alert("✅ Payment successful!");
          } else {
            alert("❌ Payment verification failed!");
          }
        },
        theme: { color: "#3399cc" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error("Payment flow error:", err);
      alert("Something went wrong!");
    }
  };

  return (
    <button
      style={{
        padding: "10px 20px",
        fontSize: "16px",
        background: "#3399cc",
        color: "#fff",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
      }}
      onClick={handlePayment}
    >
      Pay ₹{totalPrice}
    </button>
  );
}
