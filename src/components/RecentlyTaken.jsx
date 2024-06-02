import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import QuizCard from "./QuizCard";
import { fetchQuizzes } from "../services";
import { VscLoading } from "react-icons/vsc";
import LoadingSmall from "./LoadingSmall";

const RecentlyTaken = () => {
  const user = useSelector((state) => state.user);
  const { recentQuizzes, recentQuizzesLoading } = useSelector(
    (state) => state.quizzes
  );

  if (recentQuizzesLoading) {
    return <LoadingSmall />;
  }

  return (
    <div>
      <p className="text-2xl font-medium mb-8">Recently Taken</p>
      {recentQuizzes.length !== 0 ? (
        <div className="flex flex-col gap-6">
          {recentQuizzes.map((quiz) => {
            return <QuizCard key={quiz.id} userId={user.id} quiz={quiz} />;
          })}
        </div>
      ) : (
        <p className="text-xl font-medium">No recently taken quiz yet</p>
      )}
    </div>
  );
};

export default RecentlyTaken;
