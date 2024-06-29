import React from "react";

const Ingredient = ({ ingredients }) => {
  const colors = ["#0697d9", "#f87171", "#facc15", "#4ade80", "#dc2626"];

  return (
    <div className="flex gap-3 mt-2 flex-wrap ">
      {!!ingredients.length &&
        ingredients.map((ingredient, index) => (
          <span
            style={{
              backgroundColor: colors[index % colors.length],
            }}
            className="px-[6px] text-center truncate py-[2px] text-white rounded-full"
            key={index}
          >
            {ingredient}
          </span>
        ))}
    </div>
  );
};

export default Ingredient;
