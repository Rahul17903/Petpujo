import React, { useContext } from "react";
import { StoreContext } from "../../context/StoreContext";
import FoodItem from "../FoodItem/FoodItem";

const FoodDisplay = ({ category }) => {
  const { food_list } = useContext(StoreContext);

  return (
    <div className="mt-2" id="food-display">
      {/* Title */}
      <h2 className="text-[max(2vw,24px)] font-semibold">
        Top dishes near you
      </h2>

      {/* Grid of items */}
      <div className="grid mt-8 gap-x-8 gap-y-12 [grid-template-columns:repeat(auto-fill,minmax(240px,1fr))]">
        {food_list.map((item, index) => {
          if (category === "All" || category === item.category) {
            return (
              <FoodItem
                key={index}
                id={item._id}
                name={item.name}
                description={item.description}
                price={item.price}
                image={item.image}
              />
            );
          }
        })}
      </div>
    </div>
  );
};

export default FoodDisplay;
