import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { database } from '../config';
import { collection, getDocs, addDoc } from 'firebase/firestore';

function ShowAllQuestions() {
    const location = useLocation();
    const quizNameFromProps = location.state?.quizName;
    const from = location.state?.from;

    const [showAddDialogBox, setShowAddDialogBox] = useState(false);
    const [questions, setQuestions] = useState([]);
    const [question, setQuestion] = useState("");
    const [option1, setOption1] = useState("");
    const [option2, setOption2] = useState("");
    const [option3, setOption3] = useState("");
    const [correctOption, setCorrectOption] = useState("");

    const getQuizQuestions = async () => {
        if (quizNameFromProps) {
            try {
                const quizRef = collection(database, `quizzes/${quizNameFromProps}/questions`);
                const querySnapshot = await getDocs(quizRef);
                
                const fetchedQuestions = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data()
                }));
                
                setQuestions(fetchedQuestions);
            } catch (error) {
                console.error("Error fetching questions: ", error);
            }
        }
    };

    const showAddDialogBoxFunc = () => {
        setShowAddDialogBox(true);
    };

    const addQuestionToDb = async () => {
        if (question.length > 0 && option1.length > 0 && option2.length > 0 && option3.length > 0 &&
            correctOption.length > 0) {
            const newQuestion = {
                question,
                options: { o1: option1, o2: option2, o3: option3, correct: correctOption },
            };

            if (quizNameFromProps) {
                try {
                    const quizRef = collection(database, `quizzes/${quizNameFromProps}/questions`);
                    await addDoc(quizRef, newQuestion);
                    console.log("Question added to quiz");
                    
                    // Clear input fields
                    setQuestion("");
                    setOption1("");
                    setOption2("");
                    setOption3("");
                    setCorrectOption("");
                    getQuizQuestions();//update the list of questions after adding the new-question
                } catch (error) {
                    console.error("Error adding question: ", error);
                }
            } else {
                alert("Please provide a quiz name.");
            }
        } else {
            alert('Please fill in all fields.');
        }
    };

    useEffect(() => {
        if (quizNameFromProps) {
            console.log(`Current quiz name: ${quizNameFromProps}`);
            getQuizQuestions();
            console.log(from);
        }
    }, [quizNameFromProps],[questions]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 py-10 px-5">
            <h1 className="text-2xl font-semibold text-blue-600 mb-6">
                Quiz Name: <span className="text-cyan-500">{quizNameFromProps}</span>
            </h1>

            <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
                {questions.length > 0 ? (
                    questions.map((question, index) => (
                        <div key={question.id} className="mb-4">
                            <h2 className="text-lg font-bold">Q{index + 1}: {question.question}</h2>
                            <ul className="list-disc pl-5">
                                <li>Option 1: {question.options.o1}</li>
                                <li>Option 2: {question.options.o2}</li>
                                <li>Option 3: {question.options.o3}</li>
                                <p className="font-semibold text-green-400">Correct: {question.options.correct}</p>
                            </ul>
                        </div>
                    ))
                ) : (
                    <p>No questions available or quiz not found.</p>
                )}
            </div>

            {from === "addExisting" && (
                <>
                    <button 
                        className="mt-4 bg-violet-200 p-2 rounded-md" 
                        onClick={showAddDialogBoxFunc}
                    >
                        Add More Questions
                    </button>

                    {showAddDialogBox && (
                        <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8 mt-4">
                            <input
                                type="text"
                                placeholder="Enter Question"
                                value={question}
                                onChange={(e) => setQuestion(e.target.value)}
                                className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <input
                                type="text"
                                placeholder="Option 1"
                                value={option1}
                                onChange={(e) => setOption1(e.target.value)}
                                className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <input
                                type="text"
                                placeholder="Option 2"
                                value={option2}
                                onChange={(e) => setOption2(e.target.value)}
                                className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <input
                                type="text"
                                placeholder="Option 3"
                                value={option3}
                                onChange={(e) => setOption3(e.target.value)}
                                className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <input
                                type="text"
                                placeholder="Enter Correct Option"
                                value={correctOption}
                                onChange={(e) => setCorrectOption(e.target.value)}
                                className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <button 
                                className="bg-slate-300 rounded-md p-2 mt-4"
                                onClick={addQuestionToDb}
                            >
                                Add ╋
                            </button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}

export default ShowAllQuestions;


// import React, { useEffect, useState } from 'react';
// import { useLocation } from 'react-router-dom';
// import { database } from '../config';
// import { collection, getDocs } from 'firebase/firestore';

// function ShowAllQuestions() {
//     const location = useLocation();
//     const quizNameFromProps = location.state?.quizName;
//     const from = location.state?.from;

//     const [showAddDialogBox, setShowAddDialogBox] = useState(false);
//     const [questions, setQuestions] = useState([]);
//     const [question, setQuestion] = useState("");
//     const [option1, setOption1] = useState("");
//     const [option2, setOption2] = useState("");
//     const [option3, setOption3] = useState("");
//     const [correctOption, setCorrectOption] = useState("");

//     const getQuizQuestions = async () => {
//         if (quizNameFromProps) {
//             try {
//                 const quizRef = collection(database, `quizzes/${quizNameFromProps}/questions`);
//                 const querySnapshot = await getDocs(quizRef);
                
//                 const fetchedQuestions = querySnapshot.docs.map((doc) => ({
//                     id: doc.id,
//                     ...doc.data()
//                 }));
                
//                 setQuestions(fetchedQuestions);
//             } catch (error) {
//                 console.error("Error fetching questions: ", error);
//             }
//         }
//     };

//     const showAddDialogBoxFunc= () => {
//         setShowAddDialogBox(true);
//     };

//     const addQuestionToDb=async()=>{
//         if(question.length>0 && option1.length>0 && option2.length>0 && option3.length>0 &&
//             correct.length>0
//         ){
//             const newQuestion = {
//                 question,
//                 options: { o1: option1, o2: option2, o3: option3, correct: correctOption },
//               };
//               // newQuizName=quizName;
//               if (quizNameFromProps) {
//                 try {
//                   const quizRef = collection(database, `quizzes/${quizNameFromProps}/questions`);
//                   await addDoc(quizRef, newQuestion);
//                   console.log("Question added to quiz");
          
//                   setQuestion("");
//                   setOption1("");
//                   setOption2("");
//                   setOption3("");
//                   setCorrectOption("");
//                 } catch (error) {
//                   console.error("Error adding question: ", error);
//                 }
//               } else {
//                 alert("Please provide a quiz name.");
//               }
//         }else{
//             alert('ERROR ADDING DATA TO DB !!!');
//         }
//     }

//     useEffect(() => {
//         if (quizNameFromProps) {
//             console.log(`Current quiz name: ${quizNameFromProps}`);
//             getQuizQuestions();
//             console.log(from);
//         }
//     }, [quizNameFromProps]);

//     return (
//         <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 py-10 px-5">
//             <h1 className="text-2xl font-semibold text-blue-600 mb-6">
//                 Quiz Name: <span className="text-cyan-500">{quizNameFromProps}</span>
//             </h1>

//             <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
//                 {questions.length > 0 ? (
//                     questions.map((question, index) => (
//                         <div key={question.id} className="mb-4">
//                             <h2 className="text-lg font-bold">Q{index + 1}: {question.question}</h2>
//                             <ul className="list-disc pl-5">
//                                 <li>Option 1: {question.options.o1}</li>
//                                 <li>Option 2: {question.options.o2}</li>
//                                 <li>Option 3: {question.options.o3}</li>
//                                 <p className="font-semibold text-green-400">Correct: {question.options.correct}</p>
//                             </ul>
//                         </div>
//                     ))
//                 ) : (
//                     <p>No questions available or quiz not found.</p>
//                 )}
//             </div>

//             {from === "addExisting" && (
//                 <>
//                     <button 
//                         className="mt-4 bg-violet-200 p-2 rounded-md" 
//                         onClick={showAddDialogBoxFunc}
//                     >
//                         Add More Questions
//                     </button>

//                     {showAddDialogBox && (
//                         <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8 mt-4">
//                             <input
//                                 type="text"
//                                 placeholder="Enter Question"
//                                 value={question}
//                                 onChange={(e) => setQuestion(e.target.value)}
//                                 className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                             />
//                             <input
//                                 type="text"
//                                 placeholder="Option 1"
//                                 value={option1}
//                                 onChange={(e) => setOption1(e.target.value)}
//                                 className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                             />
//                             <input
//                                 type="text"
//                                 placeholder="Option 2"
//                                 value={option2}
//                                 onChange={(e) => setOption2(e.target.value)}
//                                 className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                             />
//                             <input
//                                 type="text"
//                                 placeholder="Option 3"
//                                 value={option3}
//                                 onChange={(e) => setOption3(e.target.value)}
//                                 className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                             />
//                             <input
//                                 type="text"
//                                 placeholder="Enter Correct Option"
//                                 value={correctOption}
//                                 onChange={(e) => setCorrectOption(e.target.value)}
//                                 className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                             />
//                             <button className='bg-slate-300 rounded-md p-2'
//                             onClick={()=>addQuestionToDb} >
//                                 Add ╋
//                             </button>
//                         </div>
//                     )}
//                 </>
//             )}
//         </div>
//     );
// }

// export default ShowAllQuestions;

// import React, { useEffect, useState } from 'react';
// import { useLocation } from 'react-router-dom';
// import { database } from '../config';
// import {collection, addDoc , getDocs, doc, getDoc } from 'firebase/firestore';
// import { FlatESLint } from 'eslint/use-at-your-own-risk';

// function ShowAllQuestions() {
//     // Get quiz name from the location state (passed from previous page)
//     const location = useLocation();
//     const quizNameFromProps = location.state?.quizName;
//     const from=location.state?.from;

//     const [showAddDialogBox,setShowAddDialogBox]=useState(false);
//     // State to hold the fetched questions
//     const [questions, setQuestions] = useState([]);//questions update honge to page firse re-render ho jayega

//     const [question, setQuestion] = useState("");
//     const [option1, setOption1] = useState("");
//     const [option2, setOption2] = useState("");
//     const [option3, setOption3] = useState("");
//     const [correctOption, setCorrectOption] = useState("");

//     // Fetch questions from Firestore
//     const getQuizQuestions = async () => {
//         if (quizNameFromProps) {
//             try {
//                 const quizRef = collection(database, `quizzes/${quizNameFromProps}/questions`);
//                 const querySnapshot = await getDocs(quizRef);
                
//                 // Map through the documents and extract the data
//                 const fetchedQuestions = querySnapshot.docs.map((doc) => ({
//                     id: doc.id,
//                     ...doc.data()
//                 }));
                
//                 // Update state with the fetched questions
//                 setQuestions(fetchedQuestions);
//             } catch (error) {
//                 console.error("Error fetching questions: ", error);
//             }
//         }
//     };

//     function addQuestionsToDb(){
//         setShowAddDialogBox(true);
//     }

//     // Fetch quiz questions on component mount
//     useEffect(() => {
//         if (quizNameFromProps) {
//             console.log(`current quiz name ${quizNameFromProps}`);
//             getQuizQuestions();
//             console.log(from);
//         }
//     }, [quizNameFromProps],[]);

//     return (
//         <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 py-10 px-5">
//             <h1 className="text-2xl font-semibold text-blue-600 mb-6">
//                 Quiz Name : <span className='text-cyan-500'>{quizNameFromProps}</span>
//             </h1>

//             {/* Display the list of questions */}
//             <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
//                 {questions.length > 0 ? (
//                     questions.map((question, index) => (
//                         <div key={question.id} className="mb-4">
//                             <h2 className="text-lg font-bold">Q{index + 1}: {question.question}</h2>
//                             <ul className="list-disc pl-5">
//                                 <li>Option 1: {question.options.o1}</li>
//                                 <li>Option 2: {question.options.o2}</li>
//                                 <li>Option 3: {question.options.o3}</li>
//                                 <p className="font-semibold text-green-400">Correct: {question.options.correct}</p>
//                             </ul>
//                         </div>
//                     ))
//                 ) : (
//                     <p>No questions available or quiz not found.</p>
//                 )}
//             </div>
//             {
//                 from=="addExisting"?(
//                     <button className='mt-4 bg-violet-200 p-2 rounded-md' onClick={()=>{addQuestionsToDb}}>{
//                         from=="addExisting"?(
//                             <p>AddMoreQuestions</p>
//                         ):(
//                             <p></p>
//                         )
//                     }</button>
//                 ):(
//                     <p></p>
//                 )
//             }
//             {
//                 showAddDialogBox&&from=="addExisting"&&(
//                     <input
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
//                 )
//             }
//         </div>
//     );
// }

// export default ShowAllQuestions;
