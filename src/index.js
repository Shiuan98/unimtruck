import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import store from "./redux/store";
import { Provider } from "react-redux";
import "./assets/css/bootstrap.min.css";
import "./assets/css/theme.css";
import "./assets/css/style.css";

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
  
);