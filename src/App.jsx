import { useEffect, useState } from 'react';
import './App.css';
import { database } from './config';
import { collection, addDoc, getDocs } from 'firebase/firestore';

function App() {
  const [quizName, setQuizName] = useState("");
  const [question, setQuestion] = useState("");
  const [option1, setOption1] = useState("");
  const [option2, setOption2] = useState("");
  const [option3, setOption3] = useState("");
  const [allQues, setAllQues] = useState([]); // List of all questions for the quiz

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
      const quizRef = collection(database, `quizzes/${quizName}/questions`);

      // Add the new question to the sub-collection
      await addDoc(quizRef, newQuestion);
      console.log("Question added to quiz");

      // Clear inputs after adding
      setQuestion("");
      setOption1("");
      setOption2("");
      setOption3("");

      // Fetch updated list of questions after adding
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
    if (quizName) {
      getQuizQuestions();
    }
  }, [quizName]);

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
