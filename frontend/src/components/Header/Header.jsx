import React from 'react'
import { assets } from '../../assets/assets'
const Header = () => {
  return (
    <div
      className="relative h-[34vw] my-8 mx-auto bg-no-repeat bg-cover rounded-xl text-[#ff0000]"
      style={{ backgroundImage: `url(${assets.header_img})` }}
    >
      <div
        className="
          absolute bottom-[10%] left-[6vw] flex flex-col items-start gap-[1.5vw]
          max-w-[50%] animate-fadeIn
          md:max-w-[45%]
          sm:max-w-[65%]
        "
      >
        <h2 className=" text-[max(4.5vw,22px)] font-semibold">
          Order your favourite food
        </h2>
        <p className="text-white text-[1vw] sm:hidden lg:block">
          Choose from a diverse menu featuring a delectable array of dishes
          crafted with the finest ingredients and culinary expertise. Our
          mission is to satisfy your cravings and elevate your dining experience.
        </p>
        <a href="#explore-menu">
          <button
            className="
              border-none text-[#747474] font-medium bg-white
              px-5 py-3 rounded-full
              text-[max(1vw,13px)] 
            "
          >
            View Menu
          </button>
        </a>
      </div>
    </div>
  )
}

export default Header
