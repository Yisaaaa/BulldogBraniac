import { createSlice } from "@reduxjs/toolkit";

export const quizSlice = createSlice({
  name: "quizzes",
  initialState: {
    myQuizzes: [],
    publicQuizzes: [],
    recentQuizzes: [],
    myQuizzesLoading: true,
    publicQuizzesLoading: true,
    recentQuizzesLoading: true,
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
    setRecentQuizzes: (state, action) => {
      return {
        ...state,
        recentQuizzes: action.payload,
        recentQuizzesLoading: false,
      };
    },
    addNewQuiz: (state, action) => {
      return { ...state, myQuizzes: [...state.myQuizzes, action.payload] };
    },
  },
});

export const { setPublicQuizzes, setMyQuizzes, setRecentQuizzes, addNewQuiz } =
  quizSlice.actions;

export default quizSlice.reducer;
