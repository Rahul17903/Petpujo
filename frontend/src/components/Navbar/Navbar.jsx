import React, { useContext, useState } from "react";
import { assets } from "../../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("home");
  const { getTotalCartAmount, token, setToken } = useContext(StoreContext);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
  };

  return (
    <div className="flex justify-between items-center py-5">
      {/* Logo */}
      <Link to="/">
        <h1 className="text-4xl text-orange-500 font-bold">PetPujo</h1>
      </Link>

      {/* Menu */}
      <ul className="flex list-none gap-5 text-[#49557e] text-[18px] max-[1050px]:gap-5 max-[1050px]:text-[17px] max-[900px]:gap-4 max-[900px]:text-[16px] max-[750px]:hidden">
        <Link
          to="/"
          className={`${menu === "home" ? "border-b-2 border-[#49557e] pb-[2px]" : ""}`}
          onClick={() => setMenu("home")}
        >
          Home
        </Link>
        <a
          href="#explore-menu"
          className={`${menu === "menu" ? "border-b-2 border-[#49557e] pb-[2px]" : ""}`}
          onClick={() => setMenu("menu")}
        >
          Menu
        </a>
        <Link
          to="/about"
          className={`${menu === "about" ? "border-b-2 border-[#49557e] pb-[2px]" : ""}`}
          onClick={() => setMenu("about")}
        >
          About
        </Link>
       
        <Link
          to="/contactus"
          className={`${menu === "contact-us" ? "border-b-2 border-[#49557e] pb-[2px]" : ""}`}
          onClick={() => setMenu("contact-us")}
        >
          Contact us
        </Link>
      </ul>

      {/* Right side */}
      <div className="flex items-center gap-10 max-[1050px]:gap-8 max-[900px]:gap-5">
        {/* Search */}
        <img
          src={assets.search_icon}
          alt="search"
          className="max-[1050px]:w-[22px] max-[900px]:w-[20px]"
        />

        {/* Cart */}
        <div className="relative">
          <Link to="/cart">
            <img
              src={assets.basket_icon}
              alt="cart"
              className="max-[1050px]:w-[22px] max-[900px]:w-[20px]"
            />
          </Link>
          <div
            className={`absolute min-w-[10px] min-h-[10px] rounded-[5px] bg-[tomato] top-[-8px] right-[-8px] ${
              getTotalCartAmount() === 0 ? "hidden" : "block"
            }`}
          ></div>
        </div>

        {/* Login / Profile */}
        {!token ? (
          <button
            onClick={() => setShowLogin(true)}
            className="bg-transparent text-[16px] text-[#49557e] border border-[tomato] px-8 py-2.5 rounded-full cursor-pointer transition hover:bg-[#fff4f2] max-[1050px]:px-6 max-[1050px]:py-2 max-[900px]:px-5 max-[900px]:py-[7px] max-[900px]:text-[15px]"
          >
            Sign in
          </button>
        ) : (
          <div className="relative group">
            <img
              src={assets.profile_icon}
              alt="profile"
              className="cursor-pointer py-2"
            />
            <ul className="absolute hidden bg-[#eccac4] right-0 z-10 flex-col gap-2 pl-2  pr-8 py-2 rounded border border-[tomato]  list-none group-hover:flex">
              <li
                onClick={() => navigate("/myorders")}
                className="flex items-center gap-2 cursor-pointer hover:text-[tomato]"
              >
                <img src={assets.bag_icon} alt="orders" className="w-5" />
                <p>Orders</p>
              </li>
              <hr />
              <li
                onClick={logout}
                className="flex items-center gap-2 cursor-pointer hover:text-[tomato]"
              >
                <img src={assets.logout_icon} alt="logout" className="w-5" />
                <p>Logout</p>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
