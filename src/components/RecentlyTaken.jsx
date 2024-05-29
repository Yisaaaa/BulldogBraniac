import { doc, getDoc } from "firebase/firestore";
import React from "react";
import { useSelector } from "react-redux";
import { db } from "../firebase";

const RecentlyTaken = () => {
  let recentQuizzes = useSelector((state) => state.user.recentQuizzes);

  return (
    <div>
      <p className="text-2xl font-medium">Recently Taken</p>
      <div></div>
    </div>
  );
};

export default RecentlyTaken;
