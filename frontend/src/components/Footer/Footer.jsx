import React from "react";
import { assets } from "../../assets/assets";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div
      className="text-[#d9d9d9] bg-[#323232] flex flex-col items-center gap-5 px-[8vw] py-5 pt-20 mt-24"
      id="footer"
    >
      {/* Content */}
      <div className="w-full grid grid-cols-[2fr_1fr_1fr] gap-20 max-[750px]:flex max-[750px]:flex-col max-[750px]:gap-9">
        {/* Left */}
        <div className="flex flex-col items-start gap-5">
          <h1 className="text-orange-500 text-4xl font-bold">PetPujo</h1>
          <p>
            We are committed to delivering high-quality services with a focus on
            innovation, customer satisfaction, and reliability. Our mission is
            to make life easier and more enjoyable through technology and care.
          </p>
          <div className="flex">
            <img
              src={assets.facebook_icon}
              alt="facebook"
              className="w-10 mr-4"
            />
            <img
              src={assets.twitter_icon}
              alt="twitter"
              className="w-10 mr-4"
            />
            <img src={assets.linkedin_icon} alt="linkedin" className="w-10" />
          </div>
        </div>

        {/* Center */}
        <div className="flex flex-col items-start gap-5">
          <h2 className="text-white">COMPANY</h2>
          <ul>
            <Link to='/'><li className="list-none mb-2 cursor-pointer">Home</li></Link>
            <Link to='/about'><li className="list-none mb-2 cursor-pointer">About us</li></Link>
            <Link to='/myorders'><li className="list-none mb-2 cursor-pointer">Delivery</li></Link>
            <Link to='/privacy-policy'><li className="list-none mb-2 cursor-pointer">Privacy policy</li></Link>
          </ul>
        </div>

        {/* Right */}
        <div className="flex flex-col items-start gap-5">
          <h2 className="text-white">GET IN TOUCH</h2>
          <ul>
            <li className="list-none mb-2 cursor-pointer">+91 1800 1800 52</li>
            <li className="list-none mb-2 cursor-pointer">
              petpujo.vercel.app
            </li>
          </ul>
        </div>
      </div>

      {/* Divider */}
      <hr className="w-full h-[2px] my-5 bg-gray-500 border-none" />

      {/* Copyright */}
      <p className="text-center">
        Copyright 2025 &copy; Petpujo.com - All Right Reserved.
      </p>
    </div>
  );
};

export default Footer;
