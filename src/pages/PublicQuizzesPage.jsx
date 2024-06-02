import React, { useEffect, useState } from "react";
import { fetchPublicQuizzes } from "../services";
import QuizCard from "../components/QuizCard";
import { useSelector } from "react-redux";
import Loading from "../components/Loading";

const PublicQuizzesPage = () => {
  const userId = useSelector((state) => state.user.id);
  const { publicQuizzes, publicQuizzesLoading } = useSelector(
    (state) => state.quizzes
  );

  if (publicQuizzesLoading) {
    return <Loading />;
  }

  return (
    <div className="flex relative overflow-scroll">
      <div className="w-[65%] mx-auto pt-28 overflow-y-scroll no-scrollbar scroll-smooth">
        <div className="px-28">
          <h1 className="text-4xl font-medium mb-16">Public Quizzes</h1>

          <div className="flex flex-col gap-6">
            {publicQuizzes.map((quiz) => (
              <QuizCard key={quiz.id} userId={userId} quiz={quiz} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublicQuizzesPage;
