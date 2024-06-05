import React from "react";
import { useOutletContext } from "react-router-dom";
import { FaCrown, FaMedal } from "react-icons/fa";

const QuizLeaderboard = () => {
  const quiz = useOutletContext();
  const leaderboard = quiz.leaderboard;
  console.log(leaderboard);

  const leaderboardComponent = [];

  for (let i = 0; i < leaderboard.length; i++) {
    const row = leaderboard[i];
    let rankingIcon;

    if (i === 0) {
      rankingIcon = <FaCrown className="text-yellow-400" />;
    } else if (i === 1) {
      rankingIcon = <FaMedal className="text-neutral-400" />;
    } else if (i === 2) {
      rankingIcon = <FaMedal className="text-yellow-950" />;
    } else {
      rankingIcon = i;
    }

    // switch (i) {
    //   case 0:
    //     rankingIcon = <p>h</p>;
    //   case 1:
    //     rankingIcon = <FaMedal className="text-neutral-400" />;
    //   case 2:
    //     rankingIcon = <FaMedal className="text-yellow-950" />;
    // }

    const isEven = i % 2 === 0;

    leaderboardComponent.push(
      <div
        className={`text-[#888] text-xl items-center font-semibold grid grid-cols-[10%_60%_1fr] px-12 pt-6 pb-2 ${
          !isEven ? "bg-slate-200" : ""
        }`}
      >
        <p className="text-3xl justify-self-center">{rankingIcon}</p>
        <div className="flex gap-4 items-center overflow-clip max-w-[50%] pl-14">
          <img
            className="w-10 rounded-full p-1 bg-[#818CF8]"
            src={row.profileUrl}
            alt=""
          />
          <span>{row.username}</span>
        </div>
        <p className="justify-self-end  px-8 py-1 rounded-full bg-green-300 text-green-900">
          {row.score}
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="flex gap-4 w-[65%] mx-auto">
        <button className="text-lg font-semibold mb-[4px]">Content</button>
        <button className={`border-b-4 border-b-primary text-lg font-semibold`}>
          Leaderboard
        </button>
      </div>
      <div className="w-full h-[2px] bg-[#ccc] mb-4"></div>
      <div className="w-[46%] h-[65%] mx-auto overflow-scroll scroll-smooth bg-white drop-shadow-xl rounded-lg border-2 border-[#ccc]">
        <div className="text-[#888] text-xl font-semibold grid grid-cols-[10%_60%_1fr] border-b-2 border-b-[#ccc] px-12 pt-6 pb-2">
          <p className="justify-self-center">Rank</p>
          <p className="pl-14">Username</p>
          <p className="justify-self-end mr-3">Score</p>
        </div>
        <div>{leaderboardComponent}</div>
      </div>
    </>
  );
};

export default QuizLeaderboard;
