import React, { useState, useEffect, useRef, useContext } from "react";
import axios from "axios";
import countriesList from "countries-list";
import { AiOutlineClose } from "react-icons/ai";
import { languages } from "../../utils/languges";
import { NewsContext } from "../../components/Context/NewsContext";
import { style } from "../../utils/style.js";

function PreferencesDashboard() {
  const { fetchNews, getPreferencesFromDatabase, preferences } =
    useContext(NewsContext);
  /* const [preferences, setPreferences] = useState([]); */

  const searchRef = useRef("");
  const categoryRef = useRef("");
  const countryRef = useRef("");
  const languageRef = useRef("");
  const tagRef = useRef("");

  const baseUrl = process.env.REACT_APP_BASE_BACKEND_URL;

  const countries = Object.entries(countriesList.countries).map(
    ([code, country]) => ({
      code,
      name: country.name,
    })
  );

  function getLanguageName(code) {
    const language = languages.find((lang) => lang.code === code);
    return language ? language.name : "";
  }

  /*  const getPreferencesFromDatabase = () => {
    axios
      .get(`${baseUrl}/api/preferences`)
      .then((response) => {
        const databasePreferences = response.data;
        const storedPreferences = JSON.parse(
          localStorage.getItem("preferences")
        );

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
          const fields = ["q", "category", "country", "language", "tag"];
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
  }; */

  const handleDelete = (key, value) => {
    // Delete preference from Laravel backend
    axios
      .delete(`${baseUrl}/api/preferences`, {
        data: { key, value },
      })
      .then(() => getPreferencesFromDatabase())
      .then(() => fetchNews())
      .catch((error) => {
        console.error("Error deleting preference:", error);
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const q = searchRef.current.value;
    const category = categoryRef.current.value;
    const country = countryRef.current.value;
    const language = languageRef.current.value;
    const tag = tagRef.current.value;

    // Add new preference to Laravel backend
    axios
      .post(`${baseUrl}/api/preferences`, {
        q,
        category,
        country,
        language,
        tag,
      })
      .then(() => getPreferencesFromDatabase())
      .then(() => {
        fetchNews();
      })
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
    <div className="flex flex-col md:flex-row h-full gap-4 sm:w-5/6 ">
      <div className="w-full lg:w-1/3 p-4 h-full">
        <h2 className="text-2xl mb-4 dark:text-snow">Control Preferences</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className=" mb-4">
            <input
              placeholder="Key words"
              type="text"
              id="q"
              name="q"
              ref={searchRef}
              className={`${style.dashboardInputStyle}`}
            />
          </div>
          <div className="mb-4">
            <input
              placeholder="Category"
              type="text"
              id="category"
              name="category"
              ref={categoryRef}
              className={`${style.dashboardInputStyle}`}
            />
          </div>
          <div className="mb-4">
            <input
              placeholder="Tag"
              type="text"
              id="tag"
              name="tag"
              ref={tagRef}
              className={`${style.dashboardInputStyle}`}
            />
          </div>
          <div className="relative inline-block w-full mb-4">
            <select
              className={`${style.dashboardInputStyle}`}
              id="country"
              defaultValue={countryRef || ""}
              name="country"
              ref={countryRef}
            >
              <option value="">Country</option>
              {countries.map((country) => (
                <option key={country.code} value={country.code}>
                  {country.name}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-600">
              <svg
                className="w-4 h-4 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M10 13l-6-6h12l-6 6z" />
              </svg>
            </div>
          </div>
          <div className="relative inline-block w-full">
            <select
              className={`${style.dashboardInputStyle}`}
              defaultValue={languageRef || ""}
              id="language"
              name="language"
              ref={languageRef}
            >
              <option value="en">{getLanguageName("en")}</option>
              {languages.map((language) => (
                <option key={language.code} value={language.code}>
                  {language.name}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-600">
              <svg
                className="w-4 h-4 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M10 13l-6-6h12l-6 6z" />
              </svg>
            </div>
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
          <h2 className="text-2xl dark:text-snow mb-4">Preferences List</h2>
          {Object.keys(preferences).map((key) => {
            const values = preferences[key];
            return (
              <div key={key} className="preference-block  h-1/5">
                <hr />
                <h2 className="mb-2 dark:text-snow">{`${
                  key === "q" ? "Search" : key
                }`}</h2>

                <div className="tags flex gap-4">
                  {values.map((value) => (
                    <div
                      className="relative inline-flex items-center justify-center flex-wrap "
                      key={value}
                    >
                      <div className="tag border border-gray-600 rounded-lg px-3 py-1 mr-2 dark:text-snow">
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
