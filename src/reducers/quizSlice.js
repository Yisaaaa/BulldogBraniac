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
  },
});

export const { setPublicQuizzes, setMyQuizzes } = quizSlice.actions;

export default quizSlice.reducer;
