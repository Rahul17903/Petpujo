import React, { useContext, useEffect, useState } from 'react'
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import { assets } from '../../assets/assets';

const MyOrders = () => {
  const { url, token } = useContext(StoreContext);
  const [data, setData] = useState([]);

  const fetchOrders = async () => {
    const response = await axios.post(
      url + "/api/order/userorders",
      {},
      { headers: { token } }
    );
    setData(response.data.data);
  };

  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token]);

  return (
    <div className="my-orders mt-12 mb-12">
      <h2 className="text-2xl font-semibold">My Orders</h2>
      <div className="flex flex-col-reverse gap-5 mt-8">
        {data.map((order, index) => (
          <div
            key={index}
            className="grid grid-cols-[0.5fr_2fr_1fr_1fr_2fr_1fr] items-center gap-8 text-sm p-3 sm:p-5 border border-red-500 text-gray-700
                       max-[900px]:grid-cols-[1fr_2fr_1fr] max-[900px]:gap-y-1 max-[900px]:text-xs"
          >
            <img src={assets.parcel_icon} alt="" className="w-12" />

            <p>
              {order.items.map((item, i) =>
                i === order.items.length - 1
                  ? `${item.name} X ${item.quantity}`
                  : `${item.name} X ${item.quantity}, `
              )}
            </p>

            <p>₹{order.amount}.00</p>
            <p>Items: {order.items.length}</p>

            <p>
              <span className="text-red-500">&#x25cf;</span>{" "}
              <b className="font-medium text-gray-700">{order.status}</b>
            </p>

            <button
              onClick={fetchOrders}
              className="border-none px-4 py-2 rounded bg-red-100 cursor-pointer text-gray-700 
                         max-[900px]:text-[10px]"
            >
              Track Order
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyOrders;
