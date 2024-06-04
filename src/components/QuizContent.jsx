import React from "react";
import { useOutletContext } from "react-router-dom";
import QnA from "./QnA";
import { User } from "lucide-react";
import { useSelector } from "react-redux";

const QuizContent = () => {
  const quiz = useOutletContext();
  const content = quiz.content;

  return (
    <>
      <div className="flex gap-4 w-[65%] mx-auto">
        <button className={`border-b-[2px] border-b-primary font-semibold`}>
          Content
        </button>
        <button className="font-semibold">Leaderboard</button>
      </div>
      <div className="w-full h-[2px] bg-[#ccc] mb-10"></div>
      <div className="w-[65%] max-h-[65%] mx-auto overflow-scroll scroll-smooth">
        {content.map((item) => (
          <QnA
            key={item.question}
            answer={item.answer}
            question={item.question}
          />
        ))}
      </div>
    </>
  );
};

export default QuizContent;
