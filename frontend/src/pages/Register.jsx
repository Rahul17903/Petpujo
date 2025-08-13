import React, { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    pic: null,
  });

  const navigate = useNavigate()

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setForm({ ...form, pic: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("email", form.email);
    formData.append("password", form.password);
    if (form.pic) {
      formData.append("pic", form.pic);
    }

    try {
      await api.post("/auth/register", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Registered successfully");
      navigate('/login')
    } catch (error) {
      console.error(error);
      alert("Registration failed");
    }
  };

  return (
    <div className="w-full flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md border shadow-md rounded-lg px-8 py-6 my-10 bg-white/10"
      >
        <h2 className="text-2xl font-semibold text-center mb-6">
          User Register
        </h2>

        <input
          type="text"
          name="name"
          placeholder="Enter your name"
          className="p-3 border rounded-lg w-full mb-4 focus:outline-none focus:ring-2 focus:ring-green-400"
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          className="p-3 border rounded-lg w-full mb-4 focus:outline-none focus:ring-2 focus:ring-green-400"
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Enter your password"
          className="p-3 border rounded-lg w-full mb-4 focus:outline-none focus:ring-2 focus:ring-green-400"
          onChange={handleChange}
          required
        />
        <input
          type="file"
          accept="image/*"
          className="mb-4"
          onChange={handleFileChange}
        />

        <button
          type="submit"
          className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg w-full"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
