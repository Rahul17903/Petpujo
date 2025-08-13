import React, { useEffect, useState } from "react";
import api from "../api";

export default function MyOrders() {
  const [orders, setOrders] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchOrders()
  }, [token]);

  const fetchOrders = async()=>{
    const res = await api.get('/order/allorder',{
        headers: { Authorization: `Bearer ${token}` },
      })
      console.log(res.data)
      setOrders(res.data)
  }

  return (
    <div>
      <h2>My Orders</h2>
      {orders.map((o) => (
        <div key={o._id}  className="border m-2 p-2">
          <p>Order ID: {o._id}</p>
          <p>Status: {o.paymentInfo.status}</p>
          <p>Total: ₹{o.totalAmount}</p>
        </div>
      ))}
    </div>
  );
}
