import React, { useContext, useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

// import OutsideAlerter from "../Alert/Alert";
import { UserContext } from "../Context/UserContext";
import { useNavigate } from "react-router-dom";

//import Theme from "../Theme/Theme";
import useDarkMode from "../DarkMode/DarkMode";

//icons
import { FaSun, FaMoon } from "react-icons/fa";
import Register from "../../Pages/Register/Register";
import Login from "../../Pages/Login/Login";

function Header({ theme, setTheme }) {
  const {
    openRegisterForm,
    openLoginForm,

    user,
    handleLogout,
  } = useContext(UserContext);
  const navigate = useNavigate();
  //to show the dropmenu
  const [showDropMenu, setShowDropMenu] = useState(false);

  const [darkTheme, setDarkTheme] = useDarkMode();
  const handleMode = () => setDarkTheme(!darkTheme);

  const buttonRef = useRef(null);

  const handleDropMenu = () => {
    setShowDropMenu(!showDropMenu);
  };
  const handleUserNavigateToUserProfileFromAvatar = () => {
    setShowDropMenu(!showDropMenu);
    navigate("/");
  };

  function useOutsideCloseDropMenu(ref) {
    useEffect(() => {
      function handleClickOutside(event) {
        if (!ref?.current?.contains(event?.target)) {
          setShowDropMenu(false);
        }
      }
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }
  useOutsideCloseDropMenu(buttonRef);

  return (
    <div className="dark:bg-bg-xiketic container ">
      <div className="mx-auto flex justify-between p-5 items-center">
        {!user && (
          <button className="rounded  md:p-3 font-medium inline-flex sm:w-[15%] items-center justify-center bg-btn-majorelle-blue px-6 py-3 text-cyber-yellow hover:bg-han-purple ">
            Join Us!
          </button>
        )}
        {/* when the user is signedIn */}
        {user && (
          <>
            <div className="w-full">
              <ul className="w-1/3 flex justify-around">
                <li className="hover:text-blue-800 dark:text-snow dark:hover:text-blue-600 ">
                  <a href="/">News </a>{" "}
                </li>

                <li className="hover:text-blue-800 dark:text-snow dark:hover:text-blue-600 ">
                  <a href="dashboard">Dashboard</a>{" "}
                </li>
              </ul>
            </div>
            <div ref={buttonRef} className="relative ">
              <img
                onClick={handleDropMenu}
                className="cursor-pointer  w-14 h-14 border-4 rounded-full  border-green-600 flex justify-center items-center "
                alt=""
                src={user?.avatar}
              />
              {showDropMenu && (
                <div className="flex flex-col w-60 z-[100] text-white absolute right-2 top-20 font-poppins text-base">
                  <div className="dark:border-nav-raisin-black-2 w-full bg-text-ghost-white rounded border dark:bg-nav-raisin-black-2 dark:text-snow border-gray-300  focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out dark:hover:bg-nav-raisin-black-4 transition duration-200">
                    <div
                      className="flex justify-start items-center cursor-pointer"
                      onClick={handleUserNavigateToUserProfileFromAvatar}
                    >
                      <img
                        className="cursor-pointer w-14 h-14 border-4 border-green-600 rounded-full flex justify-center items-center"
                        alt=""
                        src={user?.avatar}
                      />
                      <div className="ml-5 ">
                        {user?.firstName?.charAt(0).toUpperCase() +
                          user?.firstName?.slice(1)}{" "}
                      </div>
                    </div>
                  </div>
                  <Link
                    className="dark:border-nav-raisin-black-3 w-full bg-text-ghost-white rounded border dark:bg-nav-raisin-black-4 dark:text-snow focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out 
                  dark:hover:bg-nav-raisin-black-2 transition duration-200"
                    to="/dashboard"
                  >
                    Preferences Dashboard{" "}
                  </Link>
                  <div
                    className="dark:border-nav-raisin-black-3 w-full bg-text-ghost-white dark:bg-nav-raisin-black-4 dark:text-snow rounded border-2 border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out flex items-center cursor-pointer
                  dark:hover:bg-nav-raisin-black-2 transition duration-200"
                    onClick={handleMode}
                  >
                    <span>{darkTheme ? "Light Mode" : "Dark Mode"}</span>
                    <span className="ml-5">
                      {darkTheme ? <FaSun /> : <FaMoon />}
                    </span>
                  </div>

                  <button
                    onClick={handleLogout}
                    className="dark:border-nav-raisin-black-2 w-full bg-text-ghost-white dark:bg-nav-raisin-black dark:text-snow rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out cursor-pointer
                  dark:hover:bg-red-500 transition duration-600
                  hover:bg-red-500 transition duration-600"
                  >
                    Logout{handleLogout}
                  </button>
                </div>
              )}
            </div>{" "}
          </>
        )}
      </div>
      {/* if the open login form is there show login form */}
      {(openRegisterForm && <Register />) || (openLoginForm && <Login />)}
    </div>
  );
}

export default Header;
