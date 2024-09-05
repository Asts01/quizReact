import { useEffect, useState } from 'react';
import './App.css';
import { database } from './config';
import { collection, addDoc, getDocs, doc, getDoc } from 'firebase/firestore';

function App() {
  const [newQuizName, setNewQuizName] = useState("");
  const [question, setQuestion] = useState("");
  const [option1, setOption1] = useState("");
  const [option2, setOption2] = useState("");
  const [option3, setOption3] = useState("");
  const [correctOption, setCorrectOption] = useState("");
  const [allQues, setAllQues] = useState([]); // List of all questions for the quiz
  const [quizNames, setQuizNames] = useState([]); // List of all quiz names

  const addQuiz = async () => {
    if (option1 !== correctOption && option2 !== correctOption && option3 !== correctOption) {
      alert("Correct option doesn't match with the provided options");
      return;
    }
    if (option1 === option2 || option2 === option3 || option3 === option1) {
      alert("All fields should be unique");
      return;
    }

    const newQuestion = {
      question: question,
      options: {
        o1: option1,
        o2: option2,
        o3: option3,
        correct: correctOption
      }
    };

    if (newQuizName) {
      try {
        // Add the new question to the sub-collection
        const quizRef = collection(database, `quizzes/${newQuizName}/questions`);
        await addDoc(quizRef, newQuestion);
        console.log("Question added to quiz");

        // Add the quiz name to the quizNames collection if it doesn't already exist
        const nameRef = collection(database, "quizNames");
        const querySnapshot = await getDocs(nameRef);
        const existingNames = querySnapshot.docs.map(doc => doc.data().name);

        if (!existingNames.includes(newQuizName)) {
          await addDoc(nameRef, {
            name: newQuizName,
            time: Date.now()
          });
        }

        // Clear inputs after adding
        setQuestion("");
        setOption1("");
        setOption2("");
        setOption3("");
        setCorrectOption("");

        // Fetch updated list of questions after adding
        getQuizQuestions();
        getAllQuizNames();
      } catch (error) {
        console.error("Error adding question: ", error);
      }
    }
  };

  const getAllQuizNames = async () => {
    try {
      const nameRef = collection(database, 'quizNames');
      const querySnapshot = await getDocs(nameRef);
      const names = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setQuizNames(names);
    } catch (error) {
      console.error("Error fetching quiz names: ", error);
    }
  };

  const getQuizQuestions = async () => {
    if (newQuizName) {
      try {
        const quizRef = collection(database, `quizzes/${newQuizName}/questions`);
        const querySnapshot = await getDocs(quizRef);
        const questions = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setAllQues(questions);
      } catch (error) {
        console.error("Error fetching questions: ", error);
      }
    }
  };

  useEffect(() => {
    getAllQuizNames();
  }, []);

  useEffect(() => {
    if (newQuizName) {
      getQuizQuestions();
    }
  }, [newQuizName]);

  return (
    <>
      {/* select pvsly existing quiz */}
      <div className='bg-slate-200 p-3 will-change-auto'>
        <h2>Select A Quiz-Name</h2>
        {quizNames.length > 0 ? (
          <ul className='flex bg-slate-300 justify-center'>
          {quizNames.map((q) => (
            <div key={q.id} className='bg-slate-400 rounded-md p-1 m-2 shadow-md'>
              <button onClick={()=>setNewQuizName(q.name)}>
                <li>{q.name}</li>
              </button>
            </div>
          ))}
          </ul>
        ) : (
          <p>No Quiz Names Exist</p>
        )}
        </div>
      {/* add new quiz functiolty */}
      <div className='flex flex-col justify-center items-center gap-3'>
        <input
          type="text"
          placeholder='Enter Quiz Name'
          value={newQuizName}
          onChange={(e) => setNewQuizName(e.target.value)}
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
        <input
          type='text'
          placeholder='Enter Correct Option'
          value={correctOption}
          onChange={(e) => setCorrectOption(e.target.value)}
        />
        <button onClick={addQuiz}>Add Question</button>

        {/* Render the list of questions */}
        <div>
          {allQues.length > 0 ? (
            allQues.map((q) => (
              <div key={q.id} className='question'>
                <h3>{q.question}</h3>
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
