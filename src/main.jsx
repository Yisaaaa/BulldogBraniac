import React from "react";
import ReactDOM from "react-dom/client";
import QnA from "./components/QnA.jsx";
import "./index.css";
import store from "./store.js";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";

store.subscribe(() => {
  console.log("store changedl");
  console.log(store.getState());
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <Router>
      <QnA/>
    </Router>
  </Provider>
);
