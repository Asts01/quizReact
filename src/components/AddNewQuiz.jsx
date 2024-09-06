import React, { useEffect, useState } from 'react';
import { database } from '../config';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentQuizName } from './slice/quizSlice';
import {collection, addDoc , getDocs, doc, getDoc } from 'firebase/firestore';


function AddNewQuiz() {
  const newQuizName = useSelector((state) => state.currentQuizName);
  const dispatch = useDispatch();
  const [quizName, setQuizName] = useState("");
  const [question, setQuestion] = useState("");
  const [option1, setOption1] = useState("");
  const [option2, setOption2] = useState("");
  const [option3, setOption3] = useState("");
  const [correctOption, setCorrectOption] = useState("");
  const [questionNo, setQuestionNo] = useState(1);

  const setQuizNameInRedux = (name) => {
    dispatch(setCurrentQuizName(name));
  };

  useEffect(() => {
    console.log(newQuizName);
  }, [newQuizName]);

  async function addQuestionToDb() {
    //save the quizName to the quizNames collection
    // Add the quiz name to the quizNames collection if it doesn't already exist
    const nameRef = collection(database, "quizNames");
    const querySnapshot = await getDocs(nameRef);
    const existingNames = querySnapshot.docs.map(doc => doc.data().name);

    if (!existingNames.includes(quizName)) {
        await addDoc(nameRef, {
        name: quizName,
        time: Date.now()
        });
    }

    if (option1 !== correctOption && option2 !== correctOption && option3 !== correctOption) {
      alert("Correct option doesn't match with the provided options");
      return;
    }
    if (option1 === option2 || option2 === option3 || option3 === option1) {
      alert("All options should be unique");
      return;
    }

    const newQuestion = {
      question,
      options: { o1: option1, o2: option2, o3: option3, correct: correctOption },
    };
    // newQuizName=quizName;
    if (quizName) {
      try {
        const quizRef = collection(database, `quizzes/${quizName}/questions`);
        await addDoc(quizRef, newQuestion);
        console.log("Question added to quiz");

        setQuestion("");
        setOption1("");
        setOption2("");
        setOption3("");
        setCorrectOption("");
        setQuestionNo(questionNo + 1);
      } catch (error) {
        console.error("Error adding question: ", error);
      }
    } else {
      alert("Please provide a quiz name.");
    }
  }

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100 py-10 px-5'>
      <h1 className="text-2xl font-semibold text-blue-600 mb-6">Add a New Quiz</h1>
      {questionNo === 3 ? (
        <h2>Add one more && Your Quiz is All Set To Be Played 🚀🚀🚀</h2>
      ) : (
        <h2>Add <span className='bg-slate-400 rounded-full p-1 px-2'>{4 - questionNo}</span> more questions :</h2>
      )}

      <div className='w-full max-w-md bg-white shadow-lg rounded-lg p-8 mt-5 bg-slate-400'>
        {questionNo === 1 ? (
          <input
            type="text"
            placeholder='Enter Quiz Name'
            value={quizName}
            onChange={(e) => {
              setQuizNameInRedux(e.target.value);
              setQuizName(e.target.value);
            }}
            className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        ) : (
          <h2 className='w-full mb-4 px-4 py-2 border border-gray-300 rounded-lg'>{quizName}</h2>
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
          <NavLink to={'/showAllQuestions'} state={{ quizName:quizName,from:'addNew' }}>
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


// import React, { useEffect, useState } from 'react';
// import { database } from '../config';
// import { collection, addDoc } from 'firebase/firestore';
// import { NavLink } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { setCurrentQuizName } from './slice/quizSlice';

// function AddNewQuiz() {
//   // Access currentQuizName from the Redux store
//   const newQuizName = useSelector((state) => state.currentQuizName);
//   const dispatch = useDispatch();
//     const [quizName,setQuizName]=useState("");
//   const [question, setQuestion] = useState("");
//   const [option1, setOption1] = useState("");
//   const [option2, setOption2] = useState("");
//   const [option3, setOption3] = useState("");
//   const [correctOption, setCorrectOption] = useState("");
//   const [questionNo, setQuestionNo] = useState(1);

//   // Function to dispatch the quiz name to Redux
//   const setQuizNameInRedux = (name) => {
//     dispatch(setCurrentQuizName(name));
//   };

//   useEffect(() => {
//     console.log(newQuizName);
//   }, [newQuizName]);

//   async function addQuestionToDb() {
//     if (option1 !== correctOption && option2 !== correctOption && option3 !== correctOption) {
//       alert("Correct option doesn't match with the provided options");
//       return;
//     }
//     if (option1 === option2 || option2 === option3 || option3 === option1) {
//       alert("All options should be unique");
//       return;
//     }

//     const newQuestion = {
//       question: question,
//       options: {
//         o1: option1,
//         o2: option2,
//         o3: option3,
//         correct: correctOption,
//       },
//     };

//     if (newQuizName) {
//       try {
//         // Add the new question to the sub-collection under the quiz name
//         const quizRef = collection(database, `quizzes/${newQuizName}/questions`);
//         await addDoc(quizRef, newQuestion);
//         console.log("Question added to quiz");

//         // Clear inputs after adding the question
//         setQuestion("");
//         setOption1("");
//         setOption2("");
//         setOption3("");
//         setCorrectOption("");

//         // Increment question number
//         setQuestionNo(questionNo + 1);
//       } catch (error) {
//         console.error("Error adding question: ", error);
//       }
//     } else {
//       alert("Please provide a quiz name.");
//     }
//   }

//   return (
//     <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100 py-10 px-5'>
//       <h1 className="text-2xl font-semibold text-blue-600 mb-6">Add a New Quiz</h1>
//       {
//         questionNo === 3 ? (
//           <h2>Add one more && Your Quiz is All Set To Be Played 🚀🚀🚀</h2>
//         ) : (
//           <h2>Add <span className='bg-slate-400 rounded-full p-1 px-2'>{4 - questionNo}</span> more questions :</h2>
//         )
//       }

//       <div className='w-full max-w-md bg-white shadow-lg rounded-lg p-8 mt-5 bg-slate-400'>
//         {questionNo === 1 ? (
//           <input
//             type="text"
//             placeholder='Enter Quiz Name'
//             value={newQuizName}
//             onChange={(e) => {setQuizNameInRedux(e.target.value);setQuizName(e.target.value);}}
//             className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         ) : (
//           <h2 className='w-full mb-4 px-4 py-2 border border-gray-300 rounded-lg'>{newQuizName}</h2>
//         )}

//         <input
//           type="text"
//           placeholder='Enter Question'
//           value={question}
//           onChange={(e) => setQuestion(e.target.value)}
//           className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />
//         <input
//           type="text"
//           placeholder='Option 1'
//           value={option1}
//           onChange={(e) => setOption1(e.target.value)}
//           className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />
//         <input
//           type="text"
//           placeholder='Option 2'
//           value={option2}
//           onChange={(e) => setOption2(e.target.value)}
//           className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />
//         <input
//           type="text"
//           placeholder='Option 3'
//           value={option3}
//           onChange={(e) => setOption3(e.target.value)}
//           className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />
//         <input
//           type='text'
//           placeholder='Enter Correct Option'
//           value={correctOption}
//           onChange={(e) => setCorrectOption(e.target.value)}
//           className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />
//         {/* changes to ===1 for now from ===3 */}
//         {questionNo === 1 ? (
//           <NavLink to={'/showAllQuestions'} state={quizName}>
//             <button
//               className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-all duration-200"
//               onClick={addQuestionToDb}
//             >
//               Submit Quiz
//             </button>
//           </NavLink>
//         ) : (
//           <button
//             className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-all duration-200"
//             onClick={addQuestionToDb}
//           >
//             Add Next Question {' >'}
//           </button>
//         )}
//       </div>
//     </div>
//   );
// }

// export default AddNewQuiz;

