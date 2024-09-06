import { configureStore } from '@reduxjs/toolkit'
import { QuizSlice } from '../slice/quizSlice';

const store =  configureStore({
  reducer: {
    QuizSlice:QuizSlice,
  },
})

export default store;