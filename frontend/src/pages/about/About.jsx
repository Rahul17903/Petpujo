import React from "react";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="about-page max-w-5xl mx-auto px-6 py-12">
      {/* Heading */}
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">
        About Us
      </h1>

      {/* Intro */}
      <p className="text-gray-600 text-lg text-center mb-12">
        Welcome to <span className="text-red-500 font-semibold">FoodieHub</span>,
        your trusted destination for delicious meals delivered right to your
        doorstep. We believe that good food brings people together, and our
        mission is to serve fresh, flavorful, and affordable dishes that make
        every bite memorable.
      </p>

      {/* Sections */}
      <div className="grid md:grid-cols-2 gap-10">
        {/* Our Story */}
        <div className="bg-white shadow-md rounded-2xl p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">
            🍴 Our Story
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Founded in 2024, FoodieHub started as a small kitchen with a big
            dream — to bring happiness through food. What began with a handful
            of recipes has now grown into a diverse menu loved by thousands of
            happy customers.
          </p>
        </div>

        {/* What We Offer */}
        <div className="bg-white shadow-md rounded-2xl p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">
            🥗 What We Offer
          </h2>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li>Freshly cooked meals with quality ingredients</li>
            <li>Wide variety of cuisines and categories</li>
            <li>Easy online ordering & quick delivery</li>
            <li>Affordable prices with exciting offers</li>
          </ul>
        </div>

        {/* Our Mission */}
        <div className="bg-white shadow-md rounded-2xl p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">
            🚀 Our Mission
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Our mission is simple — <span className="font-medium">to make
            good food accessible to everyone</span>. We’re committed to
            ensuring every meal is fresh, tasty, and delivered on time.
          </p>
        </div>

        {/* Why Choose Us */}
        <div className="bg-white shadow-md rounded-2xl p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">
            ⭐ Why Choose Us?
          </h2>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li>Trusted by 10,000+ customers</li>
            <li>Hygienic food preparation</li>
            <li>24/7 customer support</li>
            <li>Fast & reliable delivery</li>
          </ul>
        </div>
      </div>

      {/* Closing */}
      <div className="mt-12 text-center">
        <h2 className="text-2xl font-semibold text-gray-800 mb-3">
          Join the FoodieHub Family ❤️
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-6">
          Whether you’re craving a quick snack or a hearty meal, FoodieHub is
          here to serve you the best flavors with love and care. Thank you for
          making us part of your dining journey!
        </p>
        <Link to={'/'}><button className="px-6 py-3 bg-red-500 text-white font-semibold rounded-full shadow-md hover:bg-red-600 transition">
          Order Now
        </button></Link>
      </div>
    </div>
  );
};

export default About;
