import { Route, Routes } from "react-router-dom";
import "./App.css";

import Header from "./components/Header/Header";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Home from "./components/Home/Home";

function App() {
  return (
    <div className="w-full h-full flex justify-center  bg-gray-100 dark:bg-bg-xiketic">
      <div className="relative lg:w-3/4 h-full">
        <Header />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />

          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
