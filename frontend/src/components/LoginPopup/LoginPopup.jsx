import React, { useContext, useState } from "react";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";

const LoginPopup = ({ setShowLogin }) => {
  const { url, setToken } = useContext(StoreContext);

  const [currState, setCurrState] = useState("Login");
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const onLogin = async (event) => {
    event.preventDefault();
    let newUrl = url;
    if (currState === "Login") {
      newUrl += "/api/user/login";
    } else {
      newUrl += "/api/user/register";
    }

    const response = await axios.post(newUrl, data);

    if (response.data.success) {
      setToken(response.data.token);
      localStorage.setItem("token", response.data.token);
      setShowLogin(false);
    } else {
      alert(response.data.message);
    }
  };

  return (
    <div className="absolute inset-0 z-10 grid bg-black/60">
      <form
        onSubmit={onLogin}
        className="place-self-center w-[min(90%,23vw)] min-w-[330px] flex flex-col gap-6 p-6 rounded-lg bg-white text-gray-500 text-sm animate-fadeIn"
      >
        {/* Title */}
        <div className="flex justify-between items-center text-black">
          <h2 className="text-xl font-semibold">{currState}</h2>
          <img
            onClick={() => setShowLogin(false)}
            src={assets.cross_icon}
            alt="close"
            className="w-4 cursor-pointer"
          />
        </div>

        {/* Inputs */}
        <div className="flex flex-col gap-5">
          {currState === "Login" ? null : (
            <input
              name="name"
              onChange={onChangeHandler}
              value={data.name}
              type="text"
              placeholder="Your name"
              required
              className="border border-gray-300 p-2 rounded outline-none"
            />
          )}
          <input
            name="email"
            onChange={onChangeHandler}
            value={data.email}
            type="email"
            placeholder="Your email"
            required
            className="border border-gray-300 p-2 rounded outline-none"
          />
          <input
            name="password"
            onChange={onChangeHandler}
            value={data.password}
            type="password"
            placeholder="Password"
            required
            className="border border-gray-300 p-2 rounded outline-none"
          />
        </div>

        {/* Button */}
        <button
          type="submit"
          className="bg-red-500 hover:bg-red-600 text-white font-medium text-base py-2 rounded cursor-pointer transition"
        >
          {currState === "Sign Up" ? "Create account" : "Login"}
        </button>

        {/* Condition */}
        <div className="flex items-start gap-2 -mt-3">
          <input type="checkbox" required className="mt-1" />
          <p className="text-xs">
            By continuing, I agree to the{" "}
            <span className="text-red-500 font-medium cursor-pointer">
              terms of use & privacy policy
            </span>
            .
          </p>
        </div>

        {/* Switch state */}
        {currState === "Login" ? (
          <p className="text-sm">
            Create a new account?{" "}
            <span
              onClick={() => setCurrState("Sign Up")}
              className="text-red-500 font-medium cursor-pointer"
            >
              Click here
            </span>
          </p>
        ) : (
          <p className="text-sm">
            Already have an account?{" "}
            <span
              onClick={() => setCurrState("Login")}
              className="text-red-500 font-medium cursor-pointer"
            >
              Login here
            </span>
          </p>
        )}
      </form>
    </div>
  );
};

export default LoginPopup;
