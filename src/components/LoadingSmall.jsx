import React from "react";
import { VscLoading } from "react-icons/vsc";

const LoadingSmall = () => {
  return (
    <div className="flex w-full h-48 items-center justify-center">
      <VscLoading className="text-4xl font-bold animate-spin" />
    </div>
  );
};

export default LoadingSmall;
