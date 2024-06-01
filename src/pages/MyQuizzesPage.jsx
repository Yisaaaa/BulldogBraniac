import React, { useEffect, useState } from "react";
import { fetchQuizzes } from "../services";
import QuizCard from "../components/QuizCard";
import { useSelector } from "react-redux";
import LoadingSmall from "../components/LoadingSmall";

const MyQuizzesPage = () => {
  const user = useSelector((state) => state.user);
  const quizzes = useSelector((state) => state.quizzes.myQuizzes);

  return (
    <div className="flex relative overflow-scroll">
      <div className="w-[65%] mx-auto pt-28 overflow-y-scroll no-scrollbar scroll-smooth">
        <div className="px-28">
          <h1 className="text-4xl font-medium mb-16">My Quizzes</h1>

          <div className="flex flex-col gap-6">
            {quizzes.map((quiz) => (
              <QuizCard key={quiz.id} userId={user.id} quiz={quiz} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyQuizzesPage;
