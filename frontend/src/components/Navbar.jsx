import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaAngleDown } from "react-icons/fa";
import api from "../api";
import { jwtDecode } from "jwt-decode";

const Navbar = () => {
  const [showProfile, setShowProfile] = useState(false);
  const [profilePic, setProfilePic] = useState(null);
  const userToken = localStorage.getItem("token");
  const [userName, setUserName] = useState("User");

  const toggleProfile = () => setShowProfile(!showProfile);

  useEffect(() => {
    const fetchUser = async () => {
      if (!userToken) return;

      try {
        const decoded = jwtDecode(userToken);
        const userId = decoded.id || decoded._id;

        // ✅ Get user name
        const res = await api.get(`/auth/user/${userId}`);
        setUserName(res.data.name);

        // ✅ Get user image
        const imageRes = await api.get(`/auth/user/${userId}/pic`, {
          responseType: "blob",
        });
        const imageUrl = URL.createObjectURL(imageRes.data);
        setProfilePic(imageUrl);
      } catch (err) {
        console.error("Error fetching user data:", err);
      }
    };

    fetchUser();
  }, [userToken]);

  return (
    <nav className="flex justify-between items-center bg-[#090832] text-white font-mono px-6 py-4">
      <Link to='/'><div className="text-2xl font-bold text-yellow-400">পেটপুজো</div></Link>

      <ul className="hidden md:flex gap-6 text-lg">
        <Link to='/about' ><li className="hover:text-gray-300 cursor-pointer">About</li></Link>
        <Link to='/contact' ><li className="hover:text-gray-300 cursor-pointer">Contact</li></Link>
        <Link to='/order' ><li className="hover:text-gray-300 cursor-pointer">Order</li></Link>
        <Link to='/cart-List'><li className="hover:text-gray-300 cursor-pointer">Cart</li></Link>
      </ul>

      {!userToken ? (
        <div className="flex items-center gap-4 relative">
          <Link to="/login">
            <button className="px-3 py-1 bg-green-700 rounded hover:bg-green-600">
              Login
            </button>
          </Link>
          <Link to="/register">
            <button className="px-3 py-1 bg-blue-700 rounded hover:bg-blue-600">
              Sign Up
            </button>
          </Link>
        </div>
      ) : (
        <div className="flex items-center gap-4 relative">
          <div className="flex items-center gap-2 cursor-pointer">
            <img
              src={profilePic || "/default-avatar.png"}
              alt="User"
              className="w-10 h-10 rounded-full object-cover"
            />
            <span>{userName.split(" ")[0]}</span>
            <button
              onClick={toggleProfile}
              className="p-2 bg-gray-800 rounded-full hover:bg-gray-700"
            >
              <FaAngleDown className="text-xl" />
            </button>
          </div>

          {showProfile && (
            <ul className="absolute right-0 top-16 bg-[#1c1b3a] border border-gray-600 rounded-lg p-2 w-40 shadow-lg z-50 text-sm space-y-2">
              <li>
                <Link
                  to="/profile"
                  className="block px-4 py-2 hover:bg-gray-700 rounded"
                  onClick={() => setShowProfile(false)}
                >
                  Profile
                </Link>
              </li>
              <li>
                <Link
                  to="/order"
                  className="block px-4 py-2 hover:bg-gray-700 rounded"
                  onClick={() => setShowProfile(false)}
                >
                  Order
                </Link>
              </li>
              <li>
                <Link
                  to="/add-product"
                  className="block px-4 py-2 hover:bg-gray-700 rounded"
                  onClick={() => setShowProfile(false)}
                >
                  Add Product
                </Link>
              </li>
              <li>
                <button
                  className="block px-4 py-2 hover:bg-gray-700 rounded w-full text-left"
                  onClick={() => {
                    localStorage.removeItem("token");
                    window.location.href = "/login";
                    setShowProfile(false);
                  }}
                >
                  Logout
                </button>
              </li>
            </ul>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
