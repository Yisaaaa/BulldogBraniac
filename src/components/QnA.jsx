import React from 'react'

const QnA = ({props}) => {

  return (
    <div className="flex flex-col items-center gap-4 bg-[#FFF7ED] w-screen h-screen">
        <div className="w-1/2 bg-white divide-y border-2 rounded-5 m-5">
            <p className="px-5 py-2">{props.answer}</p>
            <p className="px-5 py-2">{props.question}</p>
        </div>  
    </div>
  )
}

export default QnA
