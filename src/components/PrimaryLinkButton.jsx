import React from "react";
import { Link } from "react-router-dom";

const PrimaryLinkButton = ({ href, className, children, to }) => {
  return (
    <Link
      to={to}
      className={`bg-primary text-primary-foreground px-4 py-2 rounded-full font-bold  hover:bg-[#c2410c] transition-colors duration-300 ${className}`}
    >
      {children}
    </Link>
  );
};

export default PrimaryLinkButton;
