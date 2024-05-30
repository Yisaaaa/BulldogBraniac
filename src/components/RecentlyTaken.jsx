import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { db } from "../firebase";
import QuizCard from "./QuizCard";
import { VscLoading } from "react-icons/vsc";

const RecentlyTaken = () => {
  let recentQuizzes = useSelector((state) => state.user.recentQuizzes);
  const [recents, setRecents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchQuiz = async () => {
      const temp = await Promise.all(
        recentQuizzes.map(async (recentQuiz) => {
          const quizRef = doc(db, `quizzes/${recentQuiz}`);
          const data = await getDoc(quizRef);
          return data.data();
        })
      );

      setRecents(temp);
    };

    fetchQuiz().then(() => {
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return (
      <div className="flex w-full h-48 items-center justify-center">
        <VscLoading className="text-4xl font-bold animate-spin" />
      </div>
    );
  }

  console.log(recents);

  return (
    <div>
      <p className="text-2xl font-medium mb-8">Recently Taken</p>
      {recents.length !== 0 ? (
        <div className="flex flex-col gap-6">
          {recents.map((quiz) => {
            return <QuizCard key={quiz.id} quiz={quiz} />;
          })}
        </div>
      ) : (
        <p>No Recently taken quiz yet</p>
      )}
    </div>
  );
};

export default RecentlyTaken;
