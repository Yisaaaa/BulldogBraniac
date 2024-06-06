import React from "react";

const QnA = ({ currentQuestion, answered }) => {
  return (
    <div className=" bg-white divide-y-4 border-2 rounded-md m-5">
      <p className="px-5 py-2 text-lg font-medium">
        {currentQuestion.question}
      </p>
      <p className={`px-5 py-2 text-lg font-medium ${!answered && "py-6"}`}>
        {answered && currentQuestion.answer}
      </p>
    </div>
  );
};

export default QnA;
