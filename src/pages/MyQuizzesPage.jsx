import React, { useEffect, useState } from "react";
import { fetchQuizzes } from "../services";
import QuizCard from "../components/QuizCard";
import { useSelector } from "react-redux";
import { VscLoading } from "react-icons/vsc";
import LoadingSmall from "../components/LoadingSmall";

const MyQuizzesPage = () => {
  const userQuizzesIds = useSelector((state) => state.user.myQuizzes);
  const [quizzes, setQuizzes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchQuizzes(userQuizzesIds).then((res) => {
      setIsLoading(false);
      setQuizzes(res);
    });
  }, []);

  return (
    <div className="flex relative overflow-scroll">
      <div className="w-[65%] mx-auto pt-28 overflow-y-scroll no-scrollbar scroll-smooth">
        <div className="px-28">
          <h1 className="text-4xl font-medium mb-16">My Quizzes</h1>
          {isLoading ? (
            <LoadingSmall />
          ) : (
            <div className="flex flex-col gap-6">
              {quizzes.map((quiz) => (
                <QuizCard key={quiz.id} quiz={quiz} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyQuizzesPage;
