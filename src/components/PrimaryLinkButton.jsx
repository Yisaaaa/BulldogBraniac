import React from "react";

const PrimaryLinkButton = ({ href, className, children }) => {
  return (
    <a
      className={`bg-primary text-primary-foreground px-4 py-2 rounded-full font-semibold hover:animate-pulse hover:bg-[#c2410c] transition-colors duration-300 ${className}`}
      href={href}
    >
      {children}
    </a>
  );
};

export default PrimaryLinkButton;
