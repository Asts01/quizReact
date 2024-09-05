import { useEffect, useState } from 'react';
import './App.css';
import { database } from './config';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { data } from 'autoprefixer';

function App() {
  const [quizName, setQuizName] = useState("");
  const [question, setQuestion] = useState("");
  const [option1, setOption1] = useState("");
  const [option2, setOption2] = useState("");
  const [option3, setOption3] = useState("");
  const [allQues, setAllQues] = useState([]); // List of all questions for the quiz
  //all quizNames
  //create a new collection storing list of names of all the quizzes
  const [quizNames,setQuizNames]=useState([]);

  const addQuiz = async () => {
    const newQuestion = {
      question: question,
      options: {
        o1: option1,
        o2: option2,
        o3: option3
      }
    };

    if (quizName) {
      // const questionNameRef=collection(database,'quizNames');
      const quizRef = collection(database, `quizzes/${quizName}/questions`);
      //add quiz-name to the collection
      // await addDoc(questionNameRef,quizName);
      // Add the new question to the sub-collection
      await addDoc(quizRef, newQuestion);
      console.log("Question added to quiz");

      // Clear the input-feild after adding of a question
      setQuestion("");
      setOption1("");
      setOption2("");
      setOption3("");

      // Fetch updated list of questions after adding a question to be rendred at front-end
      getQuizQuestions();
    }
  };

  // Fetch all questions for the selected quiz
  const getQuizQuestions = async () => {
    if (quizName) {
      const quizRef = collection(database, `quizzes/${quizName}/questions`);
      const querySnapshot = await getDocs(quizRef); // Get all documents

      const questions = querySnapshot.docs.map(doc => ({
        id: doc.id, 
        ...doc.data()
      }));

      setAllQues(questions);
    }
  };

  // Automatically fetch questions when the quiz name changes
  useEffect(() => {
    getAllQuizNames();
    if (quizName) {
      getQuizQuestions();
    }
  }, [quizName]);

  const getAllQuizNames = async () => {
    try {
      const quizNameRef = collection(database, `quizzes`);
      // const quizNameRef = collection(database, `quizzes/Q-1`);
      const querySnapshot = await getDocs(quizNameRef);
      console.log(quizNameRef);
      console.log(querySnapshot);
      // Extract quiz names from the documents
      const quizzes = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
  
      if (quizzes.length > 0) {
        setQuizNames(quizzes); // Update the state with the list of quiz names
        console.log(quizNames);
      } else {
        console.log("No quizzes found");
      }
    } catch (error) {
      console.error("Error fetching quiz names: ", error);
    }
    console.log(quizNames);
  };

  return (
    <>
      <div className='flex flex-col justify-center items-center gap-3'>
        <input
          type="text"
          placeholder='Enter Quiz Name'
          onChange={(e) => setQuizName(e.target.value)}
        />
        <input
          type="text"
          placeholder='Enter Question'
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
        <input
          type="text"
          placeholder='Option 1'
          value={option1}
          onChange={(e) => setOption1(e.target.value)}
        />
        <input
          type="text"
          placeholder='Option 2'
          value={option2}
          onChange={(e) => setOption2(e.target.value)}
        />
        <input
          type="text"
          placeholder='Option 3'
          value={option3}
          onChange={(e) => setOption3(e.target.value)}
        />
        <button onClick={addQuiz}>Add Question</button>

        <div>
          {/* <button onClick={getAllQuizNames}>GetAllQuizNames</button> */}
          <h2>Select the pre-existing quiz</h2>
          <button onClick={getAllQuizNames}>getAllQuizNames</button>
          <ul>
            {quizNames.length > 0 ? (
              quizNames.map((quiz) => (
                <li key={quiz.id}>
                  {/* Display quiz name or ID */}
                  {quiz.id}
                </li>
              ))
            ) : (
              <p>No quizzes found</p>
            )}
          </ul>
        </div>
        {/* render all the quiz-names and set the current-quiz based upon the selection */}


        {/* Render the list of questions */}
        <div>
          {allQues.length > 0 ? (
            allQues.map((q) => (
              <div key={q.id} className='question'>
                <h3>{'Q-'}{q.question}</h3>
                <ul>
                  <li>{q.options.o1}</li>
                  <li>{q.options.o2}</li>
                  <li>{q.options.o3}</li>
                </ul>
              </div>
            ))
          ) : (
            <p>No questions available for this quiz</p>
          )}
        </div>
      </div>
    </>
  );
}

export default App;


