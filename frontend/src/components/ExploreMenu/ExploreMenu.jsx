import React from "react";
import { menu_list } from "../../assets/assets";

const ExploreMenu = ({ category, setCategory }) => {
  return (
    <div className="flex flex-col gap-5" id="explore-menu">
      {/* Title */}
      <h1 className="text-[#262626] font-semibold text-2xl">
        Explore Our Menu
      </h1>

      {/* Description */}
      <p className="max-w-[60%] text-[#808080] md:max-w-full md:text-sm">
        Choose from a diverse menu featuring a delectable array of dishes
        crafted with the finest ingredients and culinary expertise. Our mission
        is to satisfy your cravings and elevate your dining experience.
      </p>

      {/* Menu List */}
      <div className="flex justify-between items-center gap-8 text-center my-5 scrollbar-hide">
        {menu_list.map((item, index) => (
          <div
            onClick={() =>
              setCategory((prev) =>
                prev === item.menu_name ? "All" : item.menu_name
              )
            }
            key={index}
            className="flex flex-col items-center cursor-pointer"
          >
            <img
              src={item.menu_image}
              alt={item.menu_name}
              className={`w-[7.5vw] min-w-[80px] rounded-full transition duration-200 cursor-pointer ${
                category === item.menu_name
                  ? "border-[4px] border-[tomato] p-[2px]"
                  : ""
              }`}
            />
            <p className="mt-2 text-[#747474] text-[max(1.4vw,16px)] cursor-pointer">
              {item.menu_name}
            </p>
          </div>
        ))}
      </div>

      {/* Divider */}
      <hr className="my-2 h-[2px] bg-[#e2e2e2] border-0" />
    </div>
  );
};

export default ExploreMenu;
