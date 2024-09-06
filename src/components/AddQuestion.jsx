import React from 'react'

function AddQuestion() {

    const [newQuizName, setNewQuizName] = useState("");//name of the quiz->can be preloaded or add a new
    const [question, setQuestion] = useState("");
    const [option1, setOption1] = useState("");
    const [option2, setOption2] = useState("");
    const [option3, setOption3] = useState("");
    const [correctOption, setCorrectOption] = useState("");
    
  return (
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
    </div>
  )
}

export default AddQuestion
