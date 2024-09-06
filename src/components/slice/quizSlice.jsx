import { createSlice } from "@reduxjs/toolkit";

export const QuizSlice=createSlice({
    name:'QuizSlice',
    initialState:{
        currentQuizName:" ",
    },
    reducers:{
        //leke aao quizName aur set kr do state
        setCurrentQuizName:(state,action)=>{
            console.log("data received from AddNewQuiz page");
            console.log(action.payload);
            state.currentQuizName=action.payload;
        }
    }
})
export const {setCurrentQuizName}=QuizSlice.actions
export default QuizSlice.reducer