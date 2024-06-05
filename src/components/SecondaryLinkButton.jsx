import React from "react";

const SecondaryLinkButton = ({ href, children, className }) => {
  return (
    <a
      className={` text-primary shadow-[0_0_0_2px_#f97316_inset] px-4 py-2 rounded-full font-bold hover:shadow-[0_0_0_2px_white_inset] transition-all duration-300 ${className}`}
      href={href}
    >
      {children}
    </a>
  );
};

export default SecondaryLinkButton;
