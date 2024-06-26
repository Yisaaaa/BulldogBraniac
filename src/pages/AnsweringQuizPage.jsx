import React, { useEffect, useReducer, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import LoadingSmall from "../components/LoadingSmall";
import { Progress } from "@/components/ui/progress";
import QuizInfoHeader from "../components/QuizInfoHeader";
import QnA from "../components/QnA";
import QuizDone from "../components/QuizDone";
import {
  updateQuizLeaderboard,
  updateQuizzesTakenByUser,
  updateRecentlyTakenQuizzes,
  fetchPublicQuizzes,
  fetchQuizzes,
} from "../services";
import {
  setPublicQuizzes,
  setRecentQuizzes,
  setMyQuizzes,
} from "../reducers/quizSlice";
import { setQuizzesTaken } from "../reducers/userSlice";

const AnsweringQuizPage = () => {
  const {
    publicQuizzesLoading,
    myQuizzesLoading,
    recentQuizzesLoading,
    recentQuizzes,
  } = useSelector((state) => state.quizzes);
  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const id = useParams().id;
  const from = useParams().from;
  // console.log(id, from);

  const quizzes = useSelector((state) => {
    // return from === "my-quizzes"
    //   ? state.quizzes.myQuizzes
    //   : state.quizzes.publicQuizzes;
    if (from === "my-quizzes") {
      return state.quizzes.myQuizzes;
    } else if (from === "public-quizzes") {
      return state.quizzes.publicQuizzes;
    } else {
      return recentQuizzes;
    }
  });

  const [step, setStep] = useState(0);
  const [currentItem, setCurrentItem] = useState(0);
  const [answer, setAnswer] = useState("");
  const [quizDone, setQuizDone] = useState(false);

  const score = useRef(0);

  if (publicQuizzesLoading || myQuizzesLoading || recentQuizzesLoading) {
    return <LoadingSmall />;
  }

  // console.log(quizzes);
  const quiz = quizzes.find((quiz) => quiz.id === id);
  const questions = quiz.content;
  const currentQuestion = questions[currentItem];

  const handleNext = async () => {
    console.log(step, questions.length, currentItem);
    if (currentItem === questions.length - 1) {
      console.log("Quiz done");
      setQuizDone(true);
      // Do something
      // Updating recentQuizzes of user
      // try {
      // } catch (e) {
      //   console.log("Something went wrong setting new recent quizzes");
      //   console.log(e);
      // }

      try {
        const newQuizzesTaken = await updateQuizzesTakenByUser(
          score.current,
          quiz,
          user.quizzesTaken,
          user.id
        );
        dispatch(setQuizzesTaken(newQuizzesTaken));
      } catch (e) {
        console.log("Something went wrong setting new quizzes taken");
        console.log(e);
      }

      try {
        await updateQuizLeaderboard(quiz, score.current, user);

        // Fetching recent quizzes

        const newRecentQuizzes = await updateRecentlyTakenQuizzes(
          quiz,
          recentQuizzes,
          user.id
        );

        await fetchQuizzes(newRecentQuizzes.map((quiz) => quiz.id)).then(
          (res) => {
            dispatch(setRecentQuizzes(res));
          }
        );

        //Fetching the public quizzes
        await fetchPublicQuizzes(user.id).then((res) => {
          console.log(res);
          dispatch(setPublicQuizzes(res));
        });

        // Fetching signed in user's quizzes
        await fetchQuizzes(user.myQuizzes).then((res) => {
          dispatch(setMyQuizzes(res));
        });
      } catch (e) {
        console.log("Something went wrong when setting new leaderboard");
        console.log(e);
      }
    } else {
      setAnswer("");
      setStep((prev) => prev + 1);
      setCurrentItem((prev) => prev + 1);
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
                    if (option === currentQuestion.answer) {
                      score.current += 1;
                    }
                    if (!answer) {
                      setAnswer(option);
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
