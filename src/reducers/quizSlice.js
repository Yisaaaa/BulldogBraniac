import { createSlice } from "@reduxjs/toolkit";

export const quizSlice = createSlice({
  name: "quizzes",
  initialState: {
    myQuizzes: [],
    publicQuizzes: [],
    myQuizzesLoading: true,
    publicQuizzesLoading: true,
  },
  reducers: {
    setPublicQuizzes: (state, action) => {
      return {
        ...state,
        publicQuizzes: action.payload,
        publicQuizzesLoading: false,
      };
    },
    setMyQuizzes: (state, action) => {
      return { ...state, myQuizzes: action.payload, myQuizzesLoading: false };
    },
    addNewQuiz: (state, action) => {
      return { ...state, myQuizzes: [...state.myQuizzes, action.payload] };
    },
  },
});

export const { setPublicQuizzes, setMyQuizzes, addNewQuiz } = quizSlice.actions;

export default quizSlice.reducer;
