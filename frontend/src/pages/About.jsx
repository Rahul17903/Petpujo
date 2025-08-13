import React from "react";
import img1 from '../assets/my.jpeg'
import { Link } from "react-router-dom";

export default function About() {
  return (
    <div className="font-sans text-gray-800">
        <h1 className="text-4xl font-bold text-center pt-10">About</h1>

      {/* Our Story */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <h2 className="text-3xl font-semibold mb-4">Our Journey</h2>
        <p className="mb-4">
          Founded in 2024, <span className="font-semibold">FoodApp</span> was
          created to connect local restaurants with customers craving delicious
          food at the comfort of their homes. We believe in quality, speed, and
          exceptional customer service.
        </p>
        <p>
          Our mission is to make food delivery faster, safer, and more
          enjoyable — bringing fresh meals to your doorstep with just a few
          clicks.
        </p>
      </section>

      {/* What We Offer */}
      <section className="bg-gray-50 py-12">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-semibold mb-6">Why Choose Us</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              "Wide variety of cuisines",
              "Fast delivery",
              "Fresh & hygienic food",
              "Easy ordering process",
              "Multiple payment options",
              "24/7 Customer support",
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition"
              >
                <p className="text-lg">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Secure Payment Section */}
      <section className="bg-green-50 py-12">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-semibold mb-4">Safe & Secure Payments</h2>
          <p className="mb-6 max-w-3xl mx-auto">
            We value your trust. Our platform uses industry-standard encryption
            and trusted payment gateways to ensure every transaction is 100%
            secure.
          </p>
          <div className="flex justify-center gap-6 flex-wrap">
            <div className="bg-white shadow p-4 rounded-lg w-48">
              🔒 <p>SSL Encryption</p>
            </div>
            <div className="bg-white shadow p-4 rounded-lg w-48">
              💳 <p>Multiple Payment Options</p>
            </div>
            <div className="bg-white shadow p-4 rounded-lg w-48">
              🛡 <p>Verified Payment Gateway</p>
            </div>
          </div>
        </div>
      </section>

      {/* Meet the Team */}
      <section className="py-12 px-6">
        <h2 className="text-3xl font-semibold mb-6">Meet the Team</h2>
        <div>
          {[
            { name: "Rahul Ghosh", role: "Founder & CEO", img: img1, about : "I am Mern Stack Developer and iI’m a MERN stack developer with strong skills in building responsive and user-friendly web applications. I work with MongoDB, Express.js, React.js, and Node.js, and I’m also comfortable using Next.js, TypeScript, and modern frontend tools. Most of my projects are self-initiated and showcased in my personal portfolio, which reflects my ability to take an idea from concept to deployment. I’m passionate about writing clean, maintainable code, learning new technologies, and creating applications that solve real-world problems" },
          ].map((member, idx) => (
            <div
              key={idx}
              className="bg-white shadow-md flex flex-row flex-wrap rounded-lg"
            >
              <img src={member.img} alt={member.name} className="rounded w-[500px]" />
              <div className="p-4 w-fit">
                <h3 className="font-semibold">{member.name}</h3>
                <p className="text-gray-500">{member.role}</p>
              </div>
              <div className="pt-7 max-w-1/2 px-7 text-balance ">{member.about}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Statistics */}
      <section className="bg-gray-50 py-12">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          <div>
            <h3 className="text-3xl font-bold">5000+</h3>
            <p>Orders Delivered</p>
          </div>
          <div>
            <h3 className="text-3xl font-bold">100+</h3>
            <p>Partner Restaurants</p>
          </div>
          <div>
            <h3 className="text-3xl font-bold">95%</h3>
            <p>Positive Reviews</p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-12 text-center bg-green-600 text-white">
        <h2 className="text-3xl font-semibold mb-4">
          Order your favorite meal now and taste the difference!
        </h2>
        <Link to='/'>
        <button className="bg-white text-green-600 font-semibold px-6 py-3 rounded-lg hover:bg-gray-200 transition">
          Order Now
        </button></Link>
      </section>
    </div>
  );
}
