import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import 'tailwindcss/tailwind.css';

// import axios from "axios";

// axios.interceptors.request.use((config) => {
//   config.headers.Accept = 'application/json';
//   return config;
// });


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);