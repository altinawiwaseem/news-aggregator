import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { AiOutlineClose } from "react-icons/ai";

function PreferencesDashboard() {
  const [preferences, setPreferences] = useState([]);

  console.log("prefe", preferences);

  const searchRef = useRef("");
  const categoryRef = useRef("");
  const countryRef = useRef("");
  const languageRef = useRef("");
  const tagRef = useRef("");

  const baseUrl = process.env.REACT_APP_BASE_BACKEND_URL;

  const getPreferencesFromDatabase = () => {
    axios
      .get(`${baseUrl}/api/preferences`)
      .then((response) => {
        const databasePreferences = response.data;
        const storedPreferences = JSON.parse(
          localStorage.getItem("preferences")
        );
        console.log("databasePreferences", databasePreferences);

        let preferences = {};

        if (storedPreferences) {
          preferences = storedPreferences;
        }

        // Check and delete preferences that exist in localStorage but not in the database
        Object.keys(preferences).forEach((field) => {
          if (
            databasePreferences.some(
              (preference) => preference[field] !== preferences[field]
            )
          ) {
            delete preferences[field];
          }
        });

        // Update preferences with database values
        databasePreferences.forEach((preference) => {
          const fields = ["search", "category", "country", "language", "tag"];
          fields.forEach((field) => {
            if (preference[field]) {
              if (!preferences.hasOwnProperty(field)) {
                preferences[field] = [preference[field]];
              } else if (!preferences[field].includes(preference[field])) {
                preferences[field].push(preference[field].trim());
              }
            }
          });
        });

        localStorage.setItem("preferences", JSON.stringify(preferences));
        setPreferences(preferences); // Assuming setPreferences is a function to update state with preferences
      })
      .catch((error) => {
        console.error("Error fetching preferences:", error);
      });
  };

  const handleDelete = (key, value) => {
    // Delete preference from Laravel backend
    axios
      .delete(`${baseUrl}/api/preferences`, {
        data: { key, value },
      })
      .then(() => getPreferencesFromDatabase())
      .catch((error) => {
        console.error("Error deleting preference:", error);
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const search = searchRef.current.value;
    const category = categoryRef.current.value;
    const country = countryRef.current.value;
    const language = languageRef.current.value;
    const tag = tagRef.current.value;

    // Add new preference to Laravel backend
    axios
      .post(`${baseUrl}/api/preferences`, {
        search,
        category,
        country,
        language,
        tag,
      })
      .then(() => getPreferencesFromDatabase())
      .catch((error) => {
        console.error("Error adding preference:", error);
      });
    event.target.reset();
  };

  useEffect(() => {
    // Fetch preferences from Laravel backend
    getPreferencesFromDatabase();
  }, []);

  return (
    <div className="flex flex-col lg:flex-row ">
      <div className="w-full lg:w-1/3 p-4">
        <h2 className="text-2xl mb-4">Control Preferences</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="search" className="block mb-2 font-medium">
              Key Words
            </label>
            <input
              type="text"
              id="search"
              name="search"
              ref={searchRef}
              className="border border-gray-300 rounded-md p-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="category" className="block mb-2 font-medium">
              Category
            </label>
            <input
              type="text"
              id="category"
              name="category"
              ref={categoryRef}
              className="border border-gray-300 rounded-md p-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="country" className="block mb-2 font-medium">
              Country
            </label>
            <input
              type="text"
              id="country"
              name="country"
              ref={countryRef}
              className="border border-gray-300 rounded-md p-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="language" className="block mb-2 font-medium">
              Language
            </label>
            <input
              type="text"
              id="language"
              name="language"
              ref={languageRef}
              className="border border-gray-300 rounded-md p-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="tag" className="block mb-2 font-medium">
              Tag
            </label>
            <input
              type="text"
              id="tag"
              name="tag"
              ref={tagRef}
              className="border border-gray-300 rounded-md p-2 w-full"
            />
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
          >
            Save Preference
          </button>
        </form>
      </div>

      {preferences && (
        <div className="w-full lg:w-2/3 p-4">
          <h2 className="text-2xl mb-4">Preferences List</h2>
          {Object.keys(preferences).map((key) => {
            const values = preferences[key];
            return (
              <div key={key} className="preference-block  h-1/5">
                <hr />
                <h2 className="mb-2">{key}</h2>
                <div className="tags flex gap-4">
                  {values.map((value) => (
                    <div
                      className="relative inline-flex items-center justify-center flex-wrap "
                      key={value}
                    >
                      <div className="tag border border-gray-600 rounded-lg px-3 py-1 mr-2">
                        {value}
                      </div>
                      <span
                        className="delete-icon text-xl font-extrabold text-red-600 cursor-pointer absolute -top-2 -right-1 px-1  text-gray-600"
                        onClick={() => handleDelete(key, value)}
                      >
                        <AiOutlineClose />
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default PreferencesDashboard;
