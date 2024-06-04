import React from "react";

const QnA = (props) => {
  return (
    <div className="w-3/4 bg-white divide-y-4 border-2 rounded-md m-5">
      <p className="px-5 py-2 text-lg font-medium">{props.answer}</p>
      <p className="px-5 py-2 text-lg font-medium">{props.question}</p>
    </div>
  );
};

export default QnA;
