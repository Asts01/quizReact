import React from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';

function LandingPage() {
  return (
    <div className="flex flex-col h-screen items-center justify-center bg-[#FFDFD6] p-8 m-8">
      <div className='mb-5 pb-1 rounded-lg text-black text-2xl font-extrabold'>Welcome To Quiz-App 📝</div>
      <div className='text-4xl pb-3'>🧩🧩🧩</div>
      <div className="mb-8 bg-[#E3A5C7] rounded-md shadow-lg hover:scale-105 transition-transform duration-300 ease-in-out">
        {
          <Link to="/addNewQuiz">
            <button className="text-4xl font-bold text-[#694F8E] p-6 rounded-md hover:bg-[#B692C2] hover:text-white transition-colors duration-300 ease-in-out">
              Create New Quiz
            </button>
          </Link>
        }
      </div>
      <div className="mb-8 bg-[#E3A5C7] rounded-md shadow-lg hover:scale-105 transition-transform duration-300 ease-in-out">
        {
          <Link to="/addExistingQuiz">
            <button className="text-4xl font-bold text-[#694F8E] p-6 rounded-md hover:bg-[#B692C2] hover:text-white transition-colors duration-300 ease-in-out">
              Add Questions Into Existing Quizzes
            </button>
          </Link>
        }
      </div>
      <div className="mb-20 bg-[#DEF9C4] p-6 rounded-md shadow-lg hover:scale-105 transition-transform duration-300 ease-in-out">
        {
          <NavLink to="/selectQuizNameForPlay">
            <button className="text-4xl font-bold text-[#694F8E] p-6 rounded-md hover:bg-[#9cc893] hover:text-white transition-colors duration-300 ease-in-out">
              PLAY
            </button>
          </NavLink>
        }
      </div>
      <Outlet />
    </div>
  );
}

export default LandingPage;
