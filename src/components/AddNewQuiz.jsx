import React, { useState } from 'react';
import { database } from '../config';
import { collection, addDoc } from 'firebase/firestore';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {QuizSlice, setCurrentQuizName } from './slice/quizSlice';


function AddNewQuiz() {
//   const [newQuizName, setNewQuizName] = useState("");
    const newQuizName=useSelector((state)=>state.setCurrentQuizName);
    const dispatch=useDispatch();
  const [question, setQuestion] = useState("");
  const [option1, setOption1] = useState("");
  const [option2, setOption2] = useState("");
  const [option3, setOption3] = useState("");
  const [correctOption, setCorrectOption] = useState("");
  const [questionNo, setQuestionNo] = useState(1);

  const setQuizNameInRedux=(name)=>{
    dispatch(setCurrentQuizName(name));
  }

  async function addQuestionToDb() {
    if (option1 !== correctOption && option2 !== correctOption && option3 !== correctOption) {
      alert("Correct option doesn't match with the provided options");
      return;
    }
    if (option1 === option2 || option2 === option3 || option3 === option1) {
      alert("All options should be unique");
      return;
    }

    const newQuestion = {
      question: question,
      options: {
        o1: option1,
        o2: option2,
        o3: option3,
        correct: correctOption,
      },
    };

    if (newQuizName) {
      try {
        // Add the new question to the sub-collection
        const quizRef = collection(database, `quizzes/${newQuizName}/questions`);
        await addDoc(quizRef, newQuestion);
        console.log("Question added to quiz");

        // Clear inputs after adding
        setQuestion("");
        setOption1("");
        setOption2("");
        setOption3("");
        setCorrectOption("");

        // Increment question number
        setQuestionNo(questionNo + 1);
      } catch (error) {
        console.error("Error adding question: ", error);
      }
    }
  }

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100 py-10 px-5'>
      <h1 className="text-2xl font-semibold text-blue-600 mb-6">Add a New Quiz</h1>
      {
        questionNo === 3 ? (
          <h2>Add one more && Your Quiz is All Set To Be Played 🚀🚀🚀🚀</h2>
        ) : (
          <h2>Add <span className='bg-slate-400 rounded-full p-1 px-2'>{4 - questionNo}</span> more questions :</h2>
        )
      }

      <div className='w-full max-w-md bg-white shadow-lg rounded-lg p-8 mt-5 bg-slate-400'>
        {questionNo === 1 ? (
          <input
            type="text"
            placeholder='Enter Quiz Name'
            value={newQuizName}
            onChange={(e) => setQuizNameInRedux(e.target.value)}
            className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        ) : (
          <h2
            className='w-full mb-4 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
          >{newQuizName}</h2>
        )}

        <input
          type="text"
          placeholder='Enter Question'
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          placeholder='Option 1'
          value={option1}
          onChange={(e) => setOption1(e.target.value)}
          className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          placeholder='Option 2'
          value={option2}
          onChange={(e) => setOption2(e.target.value)}
          className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          placeholder='Option 3'
          value={option3}
          onChange={(e) => setOption3(e.target.value)}
          className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type='text'
          placeholder='Enter Correct Option'
          value={correctOption}
          onChange={(e) => setCorrectOption(e.target.value)}
          className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {questionNo === 3 ? (
            <NavLink to={('/showAllQuestions')}>
                <button
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-all duration-200"
            onClick={addQuestionToDb}

          >
            Submit Quiz
          </button>
            </NavLink>
        ) : (
          <button
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-all duration-200"
            onClick={addQuestionToDb}
          >
            Add Next Question {' >'}
          </button>
        )}
      </div>
    </div>
  );
}

export default AddNewQuiz;
