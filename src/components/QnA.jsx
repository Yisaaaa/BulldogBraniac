import React from 'react'

const QnA = ({question, answer}) => {

  return (
    <div className="flex flex-col items-center gap-4 bg-[#FFF7ED] w-screen h-screen">
        <div className="w-1/2 bg-white divide-y border-2 rounded-5 m-5">
            <p className="px-5 py-2">Inhertence</p>
            <p className="px-5 py-2">One object acquiring the properties and behavior of another object</p>
        </div>  
    </div>
  )
}

export default QnA
