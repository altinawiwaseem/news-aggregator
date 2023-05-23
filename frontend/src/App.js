import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header/Header";
import Register from "./Pages/Register/Register";
import Login from "./Pages/Login/Login";
import News from "./components/News/News";
import PreferencesDashboard from "./Pages/PreferencesDashboard/PreferencesDashboard";
import ProtectedRoutes from "./components/ProtectedRoute/ProtectedRoutes";

function App() {
  return (
    <div className="w-full min-h-screen flex justify-center dark:bg-bg-xiketic">
      <div className="relative lg:w-3/4 h-full">
        <Header />
        {/* <SideBar /> */}

        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route element={<ProtectedRoutes />}>
            <Route element={<News />} path="/" exact />
            <Route element={<PreferencesDashboard />} path="/dashboard" />
          </Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
