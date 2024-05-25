import React from "react";

const PrimaryLinkButton = ({ href, text, className }) => {
  return (
    <a
      className={`bg-primary text-primary-foreground px-4 py-2 rounded-full font-medium hover:animate-pulse hover:bg-[#c2410c] transition-colors duration-15 ${className}`}
      href={href}
    >
      {text}
    </a>
  );
};

export default PrimaryLinkButton;
