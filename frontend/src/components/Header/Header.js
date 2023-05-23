import React, { useContext, useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

// import OutsideAlerter from "../Alert/Alert";
import { UserContext } from "../Context/UserContext";
import { useNavigate } from "react-router-dom";

//import Theme from "../Theme/Theme";
import useDarkMode from "../DarkMode/DarkMode";

//icons
import { FaSun, FaMoon } from "react-icons/fa";
import { RxHamburgerMenu } from "react-icons/rx";
import { AiOutlineCloseCircle } from "react-icons/ai";

function Header() {
  const { buttonStyleClass, user, handleLogout } = useContext(UserContext);
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
    <>
      <div className="dark:bg-bg-xiketic bg-gray-200  px-6 sm:px-8 lg:px-12 text-white w-full ">
        <div className="mx-auto flex justify-between p-5 items-center">
          {!user && (
            <div className="w-full flex justify-center sm:justify-end">
              <Link to="/register" className="w-32">
                <button className={buttonStyleClass}>Join Us!</button>
              </Link>
            </div>
          )}
          {/* when the user is signedIn */}
          {user && (
            <>
              <div className="w-full">
                <ul className="w-1/3 flex justify-evenly">
                  <li className="hover:text-blue-800 text-blue-600 dark:text-snow dark:hover:text-blue-600 mr-2">
                    <a
                      className=" border-b-2 py-1 hover:border-b-blue-800 border-b-blue-600 dark:border-b-snow dark:hover:border-b-blue-600"
                      href="/"
                    >
                      News{" "}
                    </a>{" "}
                  </li>

                  <li className="hover:text-blue-800 text-blue-600 dark:text-snow dark:hover:text-blue-600 ">
                    <a
                      className="border-b-2 py-1 hover:border-b-blue-800 border-b-blue-600 dark:border-b-snow dark:hover:border-b-blue-600"
                      href="dashboard"
                    >
                      Dashboard
                    </a>{" "}
                  </li>
                </ul>
              </div>
              <div ref={buttonRef} className="relative ">
                {!showDropMenu ? (
                  <RxHamburgerMenu
                    onClick={handleDropMenu}
                    className="cursor-pointer  w-10 h-10 text-black dark:text-snow"
                  />
                ) : (
                  <AiOutlineCloseCircle
                    onClick={handleDropMenu}
                    className="cursor-pointer  w-10 h-10 text-black dark:text-snow"
                  />
                )}

                {showDropMenu && (
                  <div className="flex flex-col w-60 z-[100] text-white absolute -right-2 top-12 font-poppins text-base">
                    <div className="dark:border-nav-raisin-black-2 w-full bg-text-ghost-white rounded border dark:bg-nav-raisin-black-2 dark:text-snow border-gray-300  focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out dark:hover:bg-nav-raisin-black-4 transition duration-200">
                      <div
                        className="flex justify-start items-center cursor-pointer"
                        onClick={handleUserNavigateToUserProfileFromAvatar}
                      >
                        <div className="ml-5 font-bold">
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
      </div>
    </>
  );
}

export default Header;
