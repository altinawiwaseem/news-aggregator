import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

// Create a new context
const NewsContext = createContext();

// Create a NewsProvider component to wrap your app with the context provider
const NewsProvider = ({ children }) => {
  const [news, setNews] = useState([]);
  const [newsPreferences, setNewsPreferences] = useState([]);
  const [page, setPage] = useState(1);
  const [formData, setFormData] = useState(retrieveFormDataFromLocalStorage());
  const [preferences, setPreferences] = useState([]);

  // Url & Api keys
  const baseUrl = process.env.REACT_APP_BASE_BACKEND_URL;

  const newsApiKey = process.env.REACT_APP_NEWS_API_KEY;
  const newsBaseUrl = process.env.REACT_APP_NEWS_API_URL;

  const guardianApiKey = process.env.REACT_APP_GUARDIAN_API_KEY;
  const guardianBaseUrl = process.env.REACT_APP_GUARDIAN_API_URL;

  const newYorkTimesApiKey = process.env.REACT_APP_NEW_YORK_TIMES_API_KEY;

  const newYorkTimesBaseUrl = process.env.REACT_APP_NEW_YORK_TIMES_API_URL;

  // fetch preferences from database and set them to localStorage
  const getPreferencesFromDatabase = () => {
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
  };

  const updateFormData = (name, value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  function retrieveFormDataFromLocalStorage() {
    const formData = localStorage.getItem("formData");
    if (formData) {
      return JSON.parse(localStorage.getItem("formData"));
    } else {
      return [];
    }
  }

  const fetchNews = async () => {
    try {
      const newsApiParams = {
        q: formData.q,
        category: formData.category,
        searchIn: formData.searchIn,
        country: formData.country,
        from: formData.from,
        to: formData.to,
        language: formData.language,
        pageSize: 10,
      };
      const guardianApiParams = {
        q: formData.q,
        tag: formData.tag,
        section: formData.category,
        from: formData.from,
        to: formData.to,
      };

      const formatDate = (date) => {
        if (date) {
          const result = date.split("-").join("");
          return result;
        }
      };

      const newYorkTimesApiParams = {
        q: formData.q,
        fq: formData.category,
        begin_date: formatDate(formData.from),
        end_date: formatDate(formData.to),
      };

      const preferences = JSON.parse(localStorage.getItem("preferences"));

      const queryString = (params, apiSource, page, apiKey) => {
        const searchKeywords = params?.q;
        const hasMultipleKeywords =
          searchKeywords && searchKeywords.includes(" ");

        return Object.keys(params)
          .filter((key) => {
            const value = params[key];
            return value !== undefined && value !== "";
          })
          .map((key) => {
            const value = params[key];
            if (key === "q" && hasMultipleKeywords) {
              // Use AND operator for multiple search keywords
              const keywords = value
                .split(" ")
                .map((keyword) => encodeURIComponent(keyword));
              return `${encodeURIComponent(key)}=${keywords.join(" AND ")}`;
            } else if (key === "category" && apiSource === "guardianApi") {
              // Handle category parameter for The Guardian API
              if (Array.isArray(value)) {
                // Join multiple categories with AND operator
                const joinedCategories = value
                  .map((category) => encodeURIComponent(category))
                  .join(" AND ");
                return `${encodeURIComponent(key)}=${joinedCategories}`;
              } else if (value.includes(" ")) {
                // For The Guardian API, split categories and join with OR operator
                const categories = value
                  .split(" ")
                  .map((category) => encodeURIComponent(category));
                return `${encodeURIComponent(key)}=${categories.join(" OR ")}`;
              }
            } else if (Array.isArray(value)) {
              // Join multiple values with AND operator if there is a space between words
              const joinedValues = value.map((v) =>
                v.includes(" ") ? v.split(" ").join(" AND ") : v.trim()
              );
              return `${encodeURIComponent(key)}=${encodeURIComponent(
                joinedValues.join(" ")
              )}`;
            } else {
              // Pass the trimmed word
              return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
            }
          })
          .concat(`page=${encodeURIComponent(page)}`)
          .concat(
            apiSource === "guardianApi" || apiSource === "newYorkApi"
              ? `api-key=${encodeURIComponent(apiKey)}`
              : `apikey=${encodeURIComponent(apiKey)}`
          ) // Append API key to the query string
          .join("&");
      };

      async function fetchData(baseUrl, queryParams, apiSource, page, apiKey) {
        try {
          const apiUrl = `${baseUrl}${queryString(
            queryParams,
            apiSource,
            page,
            apiKey
          )}`;

          const response = await fetch(apiUrl);
          const data = await response.json();

          if (apiSource === "newsApi") {
            return data?.articles?.map((article) => ({
              ...article,
              apiSource: "newsApi",
            }));
          } else if (apiSource === "guardianApi") {
            return data?.response?.results?.map((result) => ({
              ...result,
              apiSource: "guardianApi",
            }));
          } else if (apiSource === "newYorkApi") {
            return data?.response?.docs?.map((doc) => ({
              ...doc,
              apiSource: "newYorkApi",
            }));
          }
        } catch (err) {
          console.log(err);
          return null;
        }
      }

      const newsResponse = await fetchData(
        newsBaseUrl,
        newsApiParams,
        "newsApi",
        page,
        newsApiKey
      );

      const guardianResponse = await fetchData(
        guardianBaseUrl,
        guardianApiParams,
        "guardianApi",
        page,
        guardianApiKey
      );

      const newYorkResponse = await fetchData(
        newYorkTimesBaseUrl,
        newYorkTimesApiParams,
        "newYorkApi",
        page,
        newYorkTimesApiKey
      );

      const newsPreferences = await fetchData(
        newsBaseUrl,
        preferences,
        "newsApi",
        page,
        newsApiKey
      );

      const guardianPreferences = await fetchData(
        guardianBaseUrl,
        preferences,
        "guardianApi",
        page,
        guardianApiKey
      );

      const newYorkPreferences = await fetchData(
        newYorkTimesBaseUrl,
        preferences,
        "newYorkApi",
        page,
        newYorkTimesApiKey
      );

      const combinedResponse = [
        ...(newsResponse || []),
        ...(guardianResponse || []),
        ...(newYorkResponse || []),
      ];

      const combinedPreferences = [
        ...(newsPreferences || []),
        ...(guardianPreferences || []),
        ...(newYorkPreferences || []),
      ];

      setNews(combinedResponse);

      setNewsPreferences(combinedPreferences);
    } catch (error) {
      console.error("Error fetching news:", error);
    }
  };

  useEffect(() => {
    fetchNews();
  }, [formData]);

  // Provide the context value to the child components
  return (
    <NewsContext.Provider
      value={{
        newsPreferences,
        page,
        setPage,
        setFormData,
        fetchNews,
        news,
        formData,
        updateFormData,
        retrieveFormDataFromLocalStorage,
        getPreferencesFromDatabase,
        preferences,
      }}
    >
      {children}
    </NewsContext.Provider>
  );
};

export { NewsContext, NewsProvider };
