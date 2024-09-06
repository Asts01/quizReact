import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { QuizSlice } from './slice/quizSlice';

function ShowAllQuestions() {
    //load the data from db

    const quizName = useSelector((state) => state.QuizSlice.currentQuizName);
    useEffect(()=>{
        console.log(quizName);
    })
  return (
    <div>
      
    </div>
  )
}

export default ShowAllQuestions
