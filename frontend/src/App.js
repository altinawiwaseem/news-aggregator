import { Route, Routes } from "react-router-dom";
import "./App.css";

import Header from "./components/Header/Header";

import SideBar from "./components/Sidebar/Sidebar";
import SearchBox from "./components/SearchBox/SearchBox";
import Register from "./Pages/Register/Register";
import Login from "./Pages/Login/Login";
import Home from "./Pages/Home/Home";

function App() {
  return (
    <div className="w-full min-h-screen flex justify-center dark:bg-bg-xiketic">
      <div className="relative lg:w-3/4 h-full">
        <Header />
        {/* <SideBar /> */}
        <SearchBox />

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
