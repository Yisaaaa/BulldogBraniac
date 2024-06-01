import { createSlice } from "@reduxjs/toolkit";

export const quizSlice = createSlice({
  name: "quizzes",
  initialState: {
    myQuizzes: [],
    publicQuizzes: [],
  },
  reducers: {
    setPublicQuizzes: (state, action) => {
      return { ...state, publicQuizzes: action.payload };
    },
    setMyQuizzes: (state, action) => {
      return { ...state, myQuizzes: action.payload };
    },
  },
});

export const { setPublicQuizzes, setMyQuizzes } = quizSlice.actions;

export default quizSlice.reducer;
