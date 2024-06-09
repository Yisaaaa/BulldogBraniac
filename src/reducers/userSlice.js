import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    setUser: (state, action) => {
      return action.payload;
    },

    setQuizzesTaken: (state, action) => {
      return { ...state, quizzesTaken: action.payload };
    },
  },
});

export const { setUser, setQuizzesTaken } = userSlice.actions;

export default userSlice.reducer;
