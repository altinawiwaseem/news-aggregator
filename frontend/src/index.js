import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { UserContextProvider } from "./components/Context/UserContext";
import { BrowserRouter } from "react-router-dom";
import { NewsProvider } from "./components/Context/NewsContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <UserContextProvider>
      <NewsProvider>
        <App />
      </NewsProvider>
    </UserContextProvider>
  </BrowserRouter>
);
