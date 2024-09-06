import React, { useEffect } from 'react';
import { useLocation } from 'react-router';
import { NavLink } from 'react-router-dom';

function FinishPage() {
  const location = useLocation();
  const quizName = location.state?.quizName;
  const totalQuestion = location.state?.totalNoOfQuestions;
  const correctQuestionCount = location.state?.noOfCorrectQuestions;

  useEffect(() => {
    console.log(quizName);
    console.log(totalQuestion);
    console.log(correctQuestionCount);
  });

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#D1E9F6]">
      <h2 className="text-4xl font-bold mb-8 text-[#e28878]">View Progress</h2>
      
      <div className="bg-[#F6EACB] p-8 rounded-lg shadow-md w-3/4 max-w-md">
        <div className="mb-4">
          <h3 className="text-xl font-semibold text-[#e28878]">Quiz Name:</h3>
          <p className="text-lg font-medium text-gray-700">{quizName}</p>
        </div>

        <div className="mb-4">
          <h3 className="text-xl font-semibold text-[#e28878]">Total Number of Questions:</h3>
          <p className="text-lg font-medium text-gray-700">{totalQuestion}</p>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-semibold text-[#e28878]">Correct Questions:</h3>
          <p className="text-lg font-medium text-gray-700">{correctQuestionCount}</p>
        </div>

        <NavLink to="/">
          <button className="bg-[#EECAD5] text-[#e28878] font-bold py-2 px-4 rounded-lg w-full hover:bg-[#F1D3CE] hover:text-white transition duration-300">
            Back to Home
          </button>
        </NavLink>
      </div>
    </div>
  );
}

export default FinishPage;
