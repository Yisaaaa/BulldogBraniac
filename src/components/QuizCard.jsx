import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { useSelector } from "react-redux";
import { yearColors, subjectColors } from "../colors";
import Tag from "./Tag";
import { Link } from "react-router-dom";
import { VscLoading } from "react-icons/vsc";

const QuizCard = ({ quiz, userId }) => {
  const user = useSelector((state) => state.user);
  const [quizUser, setQuizUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkIfSameUer = async () => {
      if (userId !== quiz.userId) {
        const user = await getDoc(doc(db, `users/${quiz.userId}`));
        setQuizUser(user.data());
        setIsLoading(false);
      } else {
        setQuizUser(user);
        setIsLoading(false);
      }
    };

    checkIfSameUer();
  }, []);

  return (
    <Link className="hover:scale-105 transition-all duration-200">
      <div
        style={{ borderRightColor: subjectColors[quiz.subject] }}
        className={`border-r-[68px] rounded-lg bg-white active:bg-gray-200 transition-colors duration-200 px-4 py-4 drop-shadow-lg`}
      >
        <p className="text-xl font-semibold mb-5">{quiz.title}</p>
        <div className="flex gap-2 mb-6">
          <Tag color={subjectColors[quiz.subject]}>{quiz.subject}</Tag>
          <Tag color={yearColors[quiz.year]}>{quiz.year}</Tag>
        </div>
        {isLoading ? (
          <VscLoading className="text-base font-bold animate-spin" />
        ) : (
          quizUser && (
            <div className="flex gap-2 items-end">
              <img
                className="w-7 rounded-full p-1 bg-[#818CF8]"
                src={quizUser.profileUrl}
                alt=""
              />
              <p className="font-semibold  text-gray-500">
                {quizUser.username}
              </p>
            </div>
          )
        )}
      </div>
    </Link>
  );
};

export default QuizCard;
