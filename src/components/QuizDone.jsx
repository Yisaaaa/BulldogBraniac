import React from "react";
import Confetti from "react-confetti";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const QuizDone = ({ score, questions, from, id }) => {
  const user = useSelector((state) => state.user);

  return (
    <>
      <Confetti recycle={false} numberOfPieces={500} />
      <div className="flex flex-col">
        <h1 className="text-4xl font-semibold mt-5 mb-16 text-center">
          Congratulations on finishing the Quiz!
        </h1>

        <div>
          <p className="text-2xl font-medium">
            Great job, <span className="font-bold">{user.username}</span>! You
            did well on this quiz. Keep practicing to improve more!
          </p>
          <p className="text-2xl font-medium mb-10"></p>
          <p className="text-2xl font-medium mb-4">
            Your score is{" "}
            <span className="text-green-800 font-bold">{score}</span> out of{" "}
            {questions.length}!
          </p>
        </div>
        <Link
          to={`/main/${from}/${id}/content`}
          className="bg-primary text-white px-6 py-1 font-semibold text-lg rounded-lg self-end"
        >
          Done
        </Link>
      </div>
    </>
  );
};

export default QuizDone;
