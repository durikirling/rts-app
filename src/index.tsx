import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import App2 from "./App2";
import App3 from "./App3";
import reportWebVitals from "./reportWebVitals";
import { setCustomLogs } from "./CustomLogs/CustomLog";

setCustomLogs();

console.defaultLog("Welcome to my ts-app");

// CustomLog.defaultLog("Welcome to my ts-app", "",
//   `
//   background: left / contain no-repeat url('data:image/png;base64,${imgCode5}');
//   background-color: lightpink;
//   font-style: italic;
//   font-weight: 900;
//   `)

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    {/* <App /> */}
    {/* <App2 /> */}
    <App3 />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
