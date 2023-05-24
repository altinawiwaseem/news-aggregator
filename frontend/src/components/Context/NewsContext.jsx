import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

// Create a new context
const NewsContext = createContext();

// Create a NewsProvider component to wrap your app with the context provider
const NewsProvider = ({ children }) => {
  const [news, setNews] = useState([]);
  const [newsPreferences, setNewsPreferences] = useState([]);
  /*  const [endPointsArray, setEndPointsArray] = useState([]); */
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
    return new Promise((resolve, reject) => {
      axios
        .get(`${baseUrl}/api/preferences`)
        .then((response) => {
          const databasePreferences = response.data;
          let storedPreferences = localStorage.getItem("preferences");
          storedPreferences =
            storedPreferences !== "undefined"
              ? JSON.parse(localStorage.getItem("preferences"))
              : [];

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
          setPreferences(preferences);
          resolve(preferences);
        })
        .catch((error) => {
          console.error("Error fetching preferences:", error);
          reject(error);
        });
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

  const [paramsArray, setParamsArray] = useState([]);
  const [preferencesArray, setPreferencesArray] = useState([]);

  async function endPoints(
    formData,
    newsApiKey,
    newsBaseUrl,
    guardianApiKey,
    guardianBaseUrl,
    newYorkTimesApiKey,
    newYorkTimesBaseUrl
  ) {
    const formatDate = (date) => (date ? date.split("-").join("") : null);

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

    const newYorkTimesApiParams = {
      q: formData.q,
      fq: formData.category,
      begin_date: formatDate(formData.from),
      end_date: formatDate(formData.to),
    };

    const paramsArray = [
      {
        baseUrl: newsBaseUrl,
        params: newsApiParams,
        apiSource: "newsApi",
        page: page,
        apiKey: newsApiKey,
      },
      {
        baseUrl: guardianBaseUrl,
        params: guardianApiParams,
        apiSource: "guardianApi",
        page: page,
        apiKey: guardianApiKey,
      },
      {
        baseUrl: newYorkTimesBaseUrl,
        params: newYorkTimesApiParams,
        apiSource: "newYorkApi",
        page: page,
        apiKey: newYorkTimesApiKey,
      },
    ];

    try {
      const preferences = await getPreferencesFromDatabase();
      console.log("preferences", preferences);
      const PreferencesArray = [
        {
          baseUrl: newsBaseUrl,
          params: preferences,
          apiSource: "newsApi",
          page: page,
          apiKey: newsApiKey,
        },
        {
          baseUrl: guardianBaseUrl,
          params: preferences,
          apiSource: "guardianApi",
          page: page,
          apiKey: guardianApiKey,
        },
        {
          baseUrl: newYorkTimesBaseUrl,
          params: preferences,
          apiSource: "newYorkApi",
          page: page,
          apiKey: newYorkTimesApiKey,
        },
      ];

      setPreferencesArray(PreferencesArray);
      await fetchNews(paramsArray, PreferencesArray);
    } catch (error) {
      console.error("Error fetching preferences:", error);
    }

    setParamsArray(paramsArray);
  }

  const fetchNews = async (paramsArray, preferencesArray) => {
    console.log("preferencesArray", preferencesArray);
    const queryString = (params, apiSource, page, apiKey) => {
      const searchKeywords = params?.q;
      const hasMultipleKeywords =
        searchKeywords && searchKeywords.includes(" ");

      return Object.keys(params || {})
        .filter((key) => {
          const value = params[key];
          return value !== undefined && value !== null && value !== "";
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

    try {
      const apiPromises = paramsArray.map(async (el) => {
        const response = await fetch(
          `${el.baseUrl}${queryString(
            el.params,
            el.apiSource,
            el.page,
            el.apiKey
          )}`
        );

        const data = await response.json();

        return data;
      });
      const PreferencesPromises = preferencesArray.map(async (el) => {
        const response = await fetch(
          `${el.baseUrl}${queryString(
            el.params,
            el.apiSource,
            el.page,
            el.apiKey
          )}`
        );

        const data = await response.json();

        return data;
      });
      const apiResponses = await Promise.allSettled(apiPromises);
      const preferencesResponses = await Promise.allSettled(
        PreferencesPromises
      );
      console.log("apiResponses", apiResponses);

      const apiResults = apiResponses.map((response) => {
        if (response.status === "fulfilled") {
          const result = response.value;

          if (result?.articles) {
            return result.articles.map((article) => ({
              ...article,
              apiSource: "newsApi",
            }));
          } else if (result?.response?.results) {
            return result.response.results.map((result) => ({
              ...result,
              apiSource: "guardianApi",
            }));
          } else if (result?.response?.docs) {
            return result.response.docs.map((doc) => ({
              ...doc,
              apiSource: "newYorkApi",
            }));
          }
        }

        return []; // Return an empty array if the response is not fulfilled
      });

      const preferencesResults = preferencesResponses.map((response) => {
        if (response.status === "fulfilled") {
          const result = response.value;

          if (result?.articles) {
            return result.articles.map((article) => ({
              ...article,
              apiSource: "newsApi",
            }));
          } else if (result?.response?.results) {
            return result.response.results.map((result) => ({
              ...result,
              apiSource: "guardianApi",
            }));
          } else if (result?.response?.docs) {
            return result.response.docs.map((doc) => ({
              ...doc,
              apiSource: "newYorkApi",
            }));
          }
        }

        return []; // Return an empty array if the response is not fulfilled
      });

      const combinedResults = apiResults.flat();
      const combinedPreferences = preferencesResults.flat();
      console.log("combinedResults", combinedResults);
      setNews(combinedResults);
      setNewsPreferences(combinedPreferences);
    } catch (err) {
      console.log(err);
      return null;
    }
  };

  useEffect(() => {
    endPoints(
      formData,
      newsApiKey,
      newsBaseUrl,
      guardianApiKey,
      guardianBaseUrl,
      newYorkTimesApiKey,
      newYorkTimesBaseUrl
    );
    getPreferencesFromDatabase();
  }, [formData]);

  // Provide the context value to the child components
  return (
    <NewsContext.Provider
      value={{
        baseUrl,
        newsApiKey,
        newsBaseUrl,
        guardianApiKey,
        guardianBaseUrl,
        newYorkTimesApiKey,
        newYorkTimesBaseUrl,
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
        paramsArray,
        preferencesArray,
      }}
    >
      {children}
    </NewsContext.Provider>
  );
};

export { NewsContext, NewsProvider };
