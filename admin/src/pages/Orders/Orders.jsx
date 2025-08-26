import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { assets } from "../../assets/assets";

const Orders = ({ url }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    const response = await axios.get(url + "/api/order/list");
    if (response.data.success) {
      setOrders(response.data.data);
      console.log(response.data.data);
    } else {
      toast.error("Error");
    }
  };

  const statusHandler = async (event, orderId) => {
    const response = await axios.post(url + "/api/order/status", {
      orderId,
      status: event.target.value,
    });
    if (response.data.success) {
      await fetchAllOrders();
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <div className="p-4">
      <h3 className="text-xl font-semibold mb-4">Order Page</h3>

      <div className="flex flex-col gap-6">
        {orders.map((order, index) => (
          <div
            key={index}
            className="grid grid-cols-[0.5fr_2fr_1fr_1fr_1fr] items-start gap-8 border border-[tomato] p-5 my-6 text-sm text-[#505050]
                       max-[1000px]:grid-cols-[0.5fr_2fr_1fr] max-[1000px]:p-3 max-[1000px]:gap-4 max-[1000px]:text-xs
                       max-[700px]:grid-cols-1 max-[700px]:gap-2 max-[700px]:text-sm max-[700px]:p-3"
          >
            {/* Image */}
            <img
              src={assets.parcel_icon}
              alt=""
              className="w-12 max-[1000px]:w-10 max-[700px]:w-[50px] max-[700px]:mx-auto"
            />

            {/* Order details */}
            <div>
              <p className="font-semibold">
                {order.items.map((item, idx) =>
                  idx === order.items.length - 1
                    ? `${item.name} x ${item.quantity}`
                    : `${item.name} x ${item.quantity}, `
                )}
              </p>
              <p className="font-semibold mt-7 mb-1.5">
                {order.address.firstName + " " + order.address.lastName}
              </p>
              <div className="mb-2 max-[700px]:leading-snug">
                <p>{order.address.street + ","}</p>
                <p>
                  {order.address.city +
                    ", " +
                    order.address.state +
                    ", " +
                    order.address.country +
                    ", " +
                    order.address.zipcode}
                </p>
              </div>
              <p>{order.address.phone}</p>
            </div>

            {/* Items count */}
            <p>Items : {order.items.length}</p>

            {/* Amount */}
            <p>${order.amount}</p>

            {/* Status Dropdown */}
            <select
              onChange={(event) => statusHandler(event, order._id)}
              value={order.status}
              className="bg-[#ffe8e4] border border-[tomato] px-3 py-2 outline-none
                         w-[max(10vw,120px)]
                         max-[1000px]:px-2 max-[1000px]:py-1 max-[1000px]:text-xs
                         max-[700px]:w-[70%] max-[700px]:px-2 max-[700px]:py-2 max-[700px]:text-sm"
            >
              <option value="Food Processing">Food Processing</option>
              <option value="Out for delivery">Out for delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
