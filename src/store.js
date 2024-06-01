import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/userSlice";
import quizReducer from "./reducers/quizSlice";

export default configureStore({
  reducer: {
    user: userReducer,
    quizzes: quizReducer,
  },
});
