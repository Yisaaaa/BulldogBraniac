import React from "react";
import { Link, useOutletContext } from "react-router-dom";
import QnA from "./QnA";
import { collectionGroup } from "firebase/firestore";

const QuizContent = () => {
  const quiz = useOutletContext();
  const content = quiz.content;
  console.log(quiz.content);

  return (
    <>
      <div className="flex gap-4 w-[65%] mx-auto">
        <Link
          to={""}
          className={`border-b-4 border-b-primary text-lg font-semibold`}
        >
          Content
        </Link>
        <Link to={"../leaderboard"} className="text-lg font-semibold mb-[4px]">
          Leaderboard
        </Link>
      </div>
      <div className="w-full h-[2px] bg-[#ccc] mb-10"></div>
      <div className="w-[65%] max-h-[65%] mx-auto overflow-scroll scroll-smooth">
        {content.map((item) => {
          console.log(item);
          return (
            <QnA key={item.question} currentQuestion={item} answered={true} />
          );
        })}
      </div>
    </>
  );
};

export default QuizContent;
