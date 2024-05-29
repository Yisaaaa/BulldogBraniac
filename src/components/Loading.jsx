import React from "react";
import { VscLoading } from "react-icons/vsc";

const Loading = () => {
  return (
    <div className="w-screen h-screen bg-[#fff7ed] flex items-center justify-center">
      <VscLoading className="animate-spin text-5xl font-bold" />
    </div>
  );
};

export default Loading;
