import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import QuizCard from "./QuizCard";
import { fetchQuizzes } from "../services";
import { VscLoading } from "react-icons/vsc";
import LoadingSmall from "./LoadingSmall";

const RecentlyTaken = () => {
  const user = useSelector((state) => state.user);
  const [recents, setRecents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  console.log(user.recentQuizzes);

  useEffect(() => {
    fetchQuizzes(user.recentQuizzes).then((res) => {
      setIsLoading(false);
      setRecents(res);
    });
  }, []);

  if (isLoading) {
    return <LoadingSmall />;
  }

  console.log(recents);

  return (
    <div>
      <p className="text-2xl font-medium mb-8">Recently Taken</p>
      {recents.length !== 0 ? (
        <div className="flex flex-col gap-6">
          {recents.map((quiz) => {
            return <QuizCard key={quiz.id} userId={user.id} quiz={quiz} />;
          })}
        </div>
      ) : (
        <p>No Recently taken quiz yet</p>
      )}
    </div>
  );
};

export default RecentlyTaken;
