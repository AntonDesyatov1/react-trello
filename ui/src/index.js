import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import ReduxThunk from "redux-thunk";
import rootReducer from "./store/root";

const middlewares = [ReduxThunk];
const composeEnhancers =
  (typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;
const enhancers = composeEnhancers(applyMiddleware(...middlewares));
const store = createStore(rootReducer, enhancers);
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
