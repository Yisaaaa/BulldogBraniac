import React, { useState } from "react";
import QuizInfoHeader from "../components/QuizInfoHeader";
import { Outlet, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import PrimaryLinkButton from "../components/PrimaryLinkButton";

const QuizPage = ({ quizzes }) => {
  const id = useParams().id;
  const quiz = quizzes.find((quiz) => quiz.id === id);
  const user = useSelector((state) => state.user);

  console.log(quiz);
  console.log(user.quizzesTaken[quiz.id]);

  return (
    // <div className="flex flex-col relative overflow-scroll">
    //   <div className="w-[65%] mx-auto pt-16 overflow-y-scroll no-scrollbar scroll-smooth">
    //     <QuizInfoHeader quiz={quiz} />
    //   </div>

    //   <Outlet context={quiz} />
    // </div>
    <div className="overflow-y-hidden h-screen">
      <div className="w-[65%] mx-auto pt-16 overflow-y-scroll no-scrollbar scroll-smooth">
        <QuizInfoHeader quiz={quiz} />
        <div className="flex justify-between mb-2 ">
          <p className="text-xl font-semibold">
            Current Score:{" "}
            {user.quizzesTaken[quiz.id]
              ? user.quizzesTaken[quiz.id]
              : "quiz not taken yet"}
          </p>
          <PrimaryLinkButton className={"py-1 leading-none"}>
            Take Quiz
          </PrimaryLinkButton>
        </div>
      </div>

      <Outlet context={quiz} />
    </div>
  );
};

export default QuizPage;
