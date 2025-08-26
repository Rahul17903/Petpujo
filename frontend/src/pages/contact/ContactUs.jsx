import React,{useContext, useState} from "react";
import { assets } from "../../assets/assets";
import { toast } from "react-toastify";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";

const ContactUs = () => {
    const [form, setForm] = useState({ name: "", email: "", message: "" });
    const {url} = useContext(StoreContext)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${url}/api/complaints`, form);
      toast.success("Message sent successfully ✅");
      setForm({ name: "", email: "", message: "" });
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong ❌");
    }
  };
  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      {/* Page Header */}
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800">Contact Us</h1>
        <p className="text-gray-600 mt-3">
          We'd love to hear from you! Please reach out with any questions or feedback.
        </p>
      </div>

      {/* Contact Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Contact Form */}
        <div className="bg-white p-8 rounded-2xl shadow-md">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                placeholder="Your Name"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-tomato-500 focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-tomato-500 focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Message</label>
              <textarea
                rows="5"
                name="message"
                onChange={handleChange}
                value={form.message}
                placeholder="Write your message..."
                className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-tomato-500 focus:outline-none"
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className="px-2 mx-auto block bg-tomato-500 hover:bg-tomato-600 text-white bg-orange-500 font-semibold py-2 rounded-lg transition"
            >
              Send Message
            </button>
          </form>
        </div>

        {/* Contact Info */}
        <div className="flex flex-col justify-center space-y-6">
          <div>
            <h2 className="text-lg font-semibold text-gray-800">Our Address</h2>
            <p className="text-gray-600">123 Food Street, Kolkata, India</p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-800">Email</h2>
            <p className="text-gray-600">support@petpujo.vercel.app</p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-800">Phone</h2>
            <p className="text-gray-600">+91 98765 43210</p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-800">Follow Us</h2>
            <div className="flex">
                        <img
                          src={assets.facebook_icon}
                          alt="facebook"
                          className="w-10 mr-4 bg-blue-950 rounded-full p-[0.2px]"
                        />
                        <img
                          src={assets.twitter_icon}
                          alt="twitter"
                          className="w-10 mr-4 bg-blue-950 rounded-full p-[0.2px]"
                        />
                        <img src={assets.linkedin_icon} alt="linkedin" className="w-10 bg-blue-950 rounded-full p-[0.2px]" />
                      </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
