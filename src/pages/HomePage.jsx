import React from "react";
import { useSelector } from "react-redux";
import ProgressOverview from "../components/ProgressOverview";
import RecentlyTaken from "../components/RecentlyTaken";

const HomePage = () => {
  const user = useSelector((state) => state.user);
  return (
    <div className="flex relative overflow-scroll">
      <div className="w-[65%] mx-auto pt-12 overflow-y-scroll no-scrollbar scroll-smooth">
        <header className="text-center mb-14">
          <h1 className="text-4xl font-semibold mb-2">Just get Started!</h1>
          <p className="font-semibold text-lg text-neutral-500">
            Your quote of the day
          </p>
        </header>
        <div className="px-28">
          <h2 className="text-3xl font-medium mb-8">
            Welcome back, <span className="text-primary">{user.username}</span>!
          </h2>
          <ProgressOverview />
          <RecentlyTaken />
        </div>
      </div>
      <div className="absolute top-2 right-2 w-10 h-10 rounded-full bg-red-500"></div>
    </div>
  );
};

export default HomePage;
