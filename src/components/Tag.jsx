import React from "react";

const Tag = ({ color, children }) => {
  return (
    <span
      className={`${color} px-3 text-sm py-1 text-white font-semibold rounded-full`}
    >
      {children}
    </span>
  );
};

export default Tag;
