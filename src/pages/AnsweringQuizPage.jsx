import React, { useEffect, useReducer, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import LoadingSmall from "../components/LoadingSmall";
import { Progress } from "@/components/ui/progress";
import QuizInfoHeader from "../components/QuizInfoHeader";
import QnA from "../components/QnA";
import QuizDone from "../components/QuizDone";

const AnsweringQuizPage = () => {
  const { publicQuizzesLoading, myQuizzesLoading } = useSelector(
    (state) => state.quizzes
  );

  const id = useParams().id;
  const from = useParams().from;
  // console.log(id, from);

  const quizzes = useSelector((state) => {
    return from === "my-quizzes"
      ? state.quizzes.myQuizzes
      : state.quizzes.publicQuizzes;
  });

  const [step, setStep] = useState(0);
  const [currentItem, setCurrentItem] = useState(0);
  const [answer, setAnswer] = useState("");
  const [quizDone, setQuizDone] = useState(false);

  const score = useRef(0);

  useEffect(() => {
    setCurrentItem((prev) => prev + 1);
  }, [step]);

  if (publicQuizzesLoading || myQuizzesLoading) {
    return <LoadingSmall />;
  }

  // console.log(quizzes);
  const quiz = quizzes.find((quiz) => quiz.id === id);
  const questions = quiz.content;
  const currentQuestion = questions[currentItem];

  const handleNext = () => {
    console.log(step, questions.length, currentItem);
    if (currentItem === questions.length - 1) {
      console.log("Quiz done");
      setQuizDone(true);
      // Do something
    } else {
      setAnswer("");
      setStep(step + 1);
    }
  };

  return (
    <div className="w-[45%] mx-auto pt-16 overflow-y-scroll no-scrollbar pb-12">
      {!quizDone ? (
        <>
          <Progress
            className={"bg-[#ccc] h-8 mb-14"}
            value={(step / questions.length) * 100}
          />
          <QuizInfoHeader quiz={quiz} className={"mb-16"} />
          <QnA currentQuestion={currentQuestion} answered={answer !== ""}></QnA>
          <div className="flex flex-col gap-6 items-center mt-12 w-3/4 mx-auto">
            {currentQuestion.options.map((option) => {
              let style;
              if (answer) {
                if (answer === option && answer !== currentQuestion.answer) {
                  style = "bg-red-200 text-red-900";
                } else if (option === currentQuestion.answer) {
                  style = "bg-green-200 text-green-900";
                }
              }
              return (
                <button
                  onClick={() => {
                    if (!answer) {
                      setAnswer(option);
                    }

                    if (option === currentQuestion.answer) {
                      score.current += 1;
                    }
                  }}
                  key={option}
                  className={`${style} border-2 border-[#ccc] rounded-lg w-full py-6 px-8 text-center text-lg`}
                >
                  {option}
                </button>
              );
            })}
            {answer && (
              <button
                onClick={handleNext}
                className="bg-primary self-end px-6 py-1 text-white font-semibold text-lg rounded-lg hover:bg-orange-700 transition-colors duration-200"
              >
                Next
              </button>
            )}
          </div>
        </>
      ) : (
        <QuizDone
          score={score.current}
          questions={questions}
          from={from}
          id={id}
        />
      )}
    </div>
  );
};

export default AnsweringQuizPage;