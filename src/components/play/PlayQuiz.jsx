import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router';
import { collection, getDocs } from 'firebase/firestore';
import { database } from '../../config';
import { NavLink } from 'react-router-dom';

function PlayQuiz() {
  const [questionNo, setQuestionNo] = useState(0); // start with 0 to align with array indexing
  const [loading, setLoading] = useState(true);
  const [score, setScore] = useState(0);
  const [totalNoOfQuestions, setTotalNoOfQuestions] = useState(0);
  const [prompt, setPrompt] = useState('');
  const [questions, setQuestions] = useState([]);

  const location = useLocation();
  const quizName = location.state?.quizName;

  useEffect(() => {
    getQuizQuestions();
  }, []);

  const getQuizQuestions = async () => {
    if (quizName) {
      try {
        const quizRef = collection(database, `quizzes/${quizName}/questions`);
        const querySnapshot = await getDocs(quizRef);
        const questionsViaDb = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setQuestions(questionsViaDb);
        setTotalNoOfQuestions(questionsViaDb.length); // set total number of questions
      } catch (error) {
        console.error("Error fetching questions: ", error);
      } finally {
        setLoading(false);
      }
    }
  };

  const incrementQuestionNo = () => {
    setQuestionNo(prev => prev + 1);
    setPrompt(''); // reset prompt for the next question
  };

  const incrementScore = () => {
    setScore(prev => prev + 1);
  };

  const checkStatus = (selectedOption) => {
    if (questions[questionNo].options.correct === selectedOption) {
      incrementScore();
      setPrompt('Correct Answer ✅📊💯');
    } else {
      setPrompt('Incorrect Answer ▄︻デ══━一💥');
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-[#D1E9F6] p-9">
      {loading ? (
        <h2 className="text-2xl font-bold text-gray-600">Loading....</h2>
      ) : (
        <>
          <div className="w-full max-w-3xl bg-[#F6EACB] shadow-md p-6 rounded-lg">
            <div className="flex flex-col justify-start mb-6">
              <h2 className="text-lg font-semibold text-black">Total No of Questions: {totalNoOfQuestions}</h2>
              <h2 className="text-lg font-semibold text-black">Current Score: {score}</h2>
            </div>
            
            <div className="flex flex-col items-start bg-[#F1D3CE] p-4 rounded-md">
              <h2 className="text-xl font-bold text-black mb-4">{`Q${questionNo + 1}: ${questions[questionNo].question}`}</h2>

              {questions[questionNo].options && (
                <>
                  <button
                    className="bg-[#EECAD5] text-black px-4 py-2 rounded hover:bg-[#F1D3CE] w-full mb-2"
                    onClick={() => checkStatus(questions[questionNo].options.o1)}
                  >
                    {questions[questionNo].options.o1}
                  </button>
                  <button
                    className="bg-[#EECAD5] text-black px-4 py-2 rounded hover:bg-[#F1D3CE] w-full mb-2"
                    onClick={() => checkStatus(questions[questionNo].options.o2)}
                  >
                    {questions[questionNo].options.o2}
                  </button>
                  <button
                    className="bg-[#EECAD5] text-black px-4 py-2 rounded hover:bg-[#F1D3CE] w-full mb-2"
                    onClick={() => checkStatus(questions[questionNo].options.o3)}
                  >
                    {questions[questionNo].options.o3}
                  </button>
                </>
              )}

              <div className="text-lg text-center text-black font-medium mt-2">{prompt}</div>
              {prompt.length > 0 && questionNo + 1 < questions.length ? (
                <button
                  onClick={incrementQuestionNo}
                  className="bg-purple-500 hover:bg-purple-600 text-white rounded-md py-2 px-4 mt-4"
                >
                  Next Question
                </button>
              ) : (
                prompt.length > 0 && questionNo + 1 === questions.length && (
                  <NavLink
                    to="/finishPage"
                    state={{
                      quizName: quizName,
                      noOfCorrectQuestions: score,
                      totalNoOfQuestions: totalNoOfQuestions,
                    }}
                  >
                    <button className="bg-green-500 text-white p-3 rounded-lg mt-4 hover:bg-green-600">
                      View Progress
                    </button>
                  </NavLink>
                )
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default PlayQuiz;
