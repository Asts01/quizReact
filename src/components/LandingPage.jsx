import React from 'react';
import { Link,NavLink, Outlet } from 'react-router-dom';

function LandingPage() {
  return (
    <div className="flex flex-col h-screen items-center justify-center bg-gray-100 p-4 m-10 mb-30">
      <div className="mb-8 bg-slate-300 rounded-md">
        {
            <Link
            to="/addNewQuiz">
                <button className="text-4xl font-bold text-blue-600 p-4 rounded-md">Create New Quiz</button>
            </Link>
        }
      </div>
      <div className="mb-8 bg-slate-300 rounded-md">
        {
            <Link
            to="/addNewQuiz">
                <button className="text-4xl font-bold text-blue-600 p-4 rounded-md">Add Q Into Existing Quiz</button>
            </Link>
        }
      </div>
      <div className='mb-20 bg-slate-300 p-4 rounded-md'>
        {
            <NavLink>
                 <button className="text-4xl font-bold text-green-600 rounded-md">PLAY</button>
            </NavLink>
        }
      </div>
      <Outlet/>
    </div>
  );
}

export default LandingPage;

