import { doc, getDoc } from "firebase/firestore";
import React from "react";
import { useSelector } from "react-redux";
import { db } from "../firebase";

const RecentlyTaken = () => {
  let recentQuizzes = useSelector((state) => state.user.recentQuizzes);
  const recents = [];

  recentQuizzes.forEach(async (quiz) => {
    const quizRef = doc(db, `quizzes/${quiz}`);
    recents.push((await getDoc(quizRef)).data());
  });

  console.log(recents);

  return (
    <div>
      <p className="text-2xl font-medium">Recently Taken</p>
      <div></div>
    </div>
  );
};

export default RecentlyTaken;
