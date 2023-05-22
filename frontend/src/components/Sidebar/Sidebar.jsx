import React, { useContext, useRef, useState } from "react";
import { NewsContext } from "../Context/NewsContext";

function Sidebar() {
  const { news } = useContext(NewsContext);

  const [isOpen, setIsOpen] = useState(false);
  const sidebarRef = useRef(null);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  return (
    <div>
      <button
        className="btn btn-primary w-2/5 self-center bg-blue-600 m-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
        onClick={toggleSidebar}
      >
        Open Sidebar
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 bg-gray-900 bg-opacity-50 z-50 flex items-center justify-center"
          onClick={handleClickOutside}
        >
          <div
            ref={sidebarRef}
            className="flex flex-col bg-white w-full p-5 sm:px-20 gap-2 rounded-md drop-shadow-lg relative dark:bg-bg-xiketic dark:shadow-6xl"
          >
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              onClick={toggleSidebar}
            >
              <svg
                className="w-6 h-6 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M13.414 12l3.536 3.536-1.414 1.414L12 13.414l-3.536 3.536-1.414-1.414L10.586 12 7.05 8.464l1.414-1.414L12 10.586l3.536-3.536 1.414 1.414L13.414 12z"
                  clipRule="evenodd"
                />
              </svg>
            </button>

            <form>
              <div className="relative flex w-full gap-2">
                <input
                  name="q"
                  type="text"
                  defaultValue={""}
                  className={`dark:bg-input-space-cadet peer w-full pb-1 pt-3 px-3 text-base rounded-lg border border-gray-400 focus:border-red-400 text-gray-600 bg-white focus:outline-none focus:ring-0 appearance-none transition-colors duration-300 `}
                  placeholder="Keywords or phrases"
                />
              </div>

              <div className="sm:flex sm:gap-4 ">
                {/* Rest of the input fields */}
              </div>

              <div className="sm:flex sm:gap-4 items-center">
                {/* Rest of the input fields */}
              </div>

              <button
                className="btn btn-primary w-2/5 self-center bg-blue-600 m-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
                type="submit"
              >
                Search
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Sidebar;
