import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header/Header";
import SearchBox from "./components/SearchBox/SearchBox";
import Register from "./Pages/Register/Register";
import Login from "./Pages/Login/Login";
import Home from "./Pages/Home/Home";
import News from "./components/News/News";
import PreferencesDashboard from "./Pages/PreferencesDashboard/PreferencesDashboard";

function App() {
  return (
    <div className="w-full min-h-screen flex justify-center dark:bg-bg-xiketic">
      <div className="relative lg:w-3/4 h-full">
        <Header />
        {/* <SideBar /> */}

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<PreferencesDashboard />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/news" element={<News />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
