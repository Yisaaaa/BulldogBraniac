import Tag from "./Tag";
import React from "react";
import { yearColors, subjectColors } from "../colors";

const QuizInfoHeader = ({ quiz, className }) => {
  // console.log(quiz);
  return (
    <div className={`mb-4 ${className}`}>
      <p className="text-3xl font-semibold mb-4">{quiz.title}</p>
      <div className="flex gap-2 mb-4">
        <Tag color={subjectColors[quiz.subject]}>{quiz.subject}</Tag>
        <Tag color={yearColors[quiz.year]}>{quiz.year}</Tag>
      </div>

      <div className="flex gap-2 items-end mb-4">
        <img
          className="w-7 rounded-full p-1 bg-[#818CF8]"
          src={quiz.user.profileUrl}
          alt=""
        />
        <p className="font-semibold  text-gray-500">{quiz.user.username}</p>
      </div>
    </div>
  );
};

export default QuizInfoHeader;
