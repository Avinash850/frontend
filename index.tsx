import React from "react";
import ReactDOM from "react-dom/client";
import App from "./src/App";
// import 'bootstrap/dist/css/bootstrap.min.css';
import "./index.css"; // Tailwind
import DoctorContextProvider from "./src/context/DoctorContextProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <DoctorContextProvider>
    <App />
  </DoctorContextProvider>
);
