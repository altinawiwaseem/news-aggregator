import React, { createContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import qs from "qs";

// Create a new context
const NewsContext = createContext();

// Create a NewsProvider component to wrap your app with the context provider
const NewsProvider = ({ children }) => {
  const [news, setNews] = useState([]);

  const [formData, setFormData] = useState(retrieveFormDataFromLocalStorage());

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

  /* const newsApiKey = process.env.REACT_APP_NEWS_API_KEY; */
  const newsApiKey = "02ab19593071412b97b5d1b963396217";
  const newsBaseUrl = process.env.REACT_APP_NEWS_API_URL;

  const guardianApiKey = process.env.REACT_APP_GUARDIAN_API_KEY;
  const guardianBaseUrl = process.env.REACT_APP_GUARDIAN_API_URL;

  const newYorkTimesApiKey = process.env.REACT_APP_NEW_YORK_TIMES_API_KEY;

  const newYorkTimesBaseUrl = process.env.REACT_APP_NEW_YORK_TIMES_API_URL;

  const [data, setData] = useState([]);

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
        apiKey: newsApiKey,
      };
      const guardianApiParams = {
        q: formData.q,
        tag: formData.tag,
        section: formData.category,
        from: formData.from,
        to: formData.to,
        "api-key": guardianApiKey,
      };

      const formatDate = (date) => {
        const result = date.split("-").join("");
        return result;
      };

      const newYorkTimesApiParams = {
        q: formData.q,
        fq: formData.category,
        begin_date: formatDate(formData.from),
        end_date: formatDate(formData.to),
        "api-key": newYorkTimesApiKey,
      };

      const queryString = (params) =>
        Object.keys(params)
          .filter((key) => params[key] !== undefined && params[key] !== "") // Only include parameters with non-empty values
          .map(
            (key) =>
              `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`
          )
          .join("&");

      let newsData = [];
      let guardianData = [];
      let newYorkData = [];

      try {
        const NewYorkResponse = await fetch(
          `${newYorkTimesBaseUrl}${queryString(newYorkTimesApiParams)}`
        )
          .then((data) => data.json())
          .then((response) => {
            newYorkData = response.response.docs.map((doc) => ({
              ...doc,
              apiSource: "newYorkApi",
            }));
          });
      } catch (err) {
        console.log(err);
      }

      try {
        const guardianApiUrl = `${guardianBaseUrl}&${queryString(
          guardianApiParams
        )}`;
        const guardianApiResponse = await axios.get(guardianApiUrl);

        guardianData = guardianApiResponse.data.response.results.map(
          (result) => ({
            ...result,
            apiSource: "guardianApi",
          })
        );
      } catch (error) {
        console.error("Error fetching news from guardianApi:", error);
      }

      try {
        const newsApiUrl = `${newsBaseUrl}?${queryString(newsApiParams)}`;
        const newsApiResponse = await axios.get(newsApiUrl);

        newsData = newsApiResponse.data.articles.map((article) => ({
          ...article,
          apiSource: "newsApi",
        }));
      } catch (error) {
        console.error("Error fetching news from newsApi:", error);
      }

      const combinedResponse = [...newsData, ...guardianData, ...newYorkData];

      setNews(combinedResponse);
      console.log("news", combinedResponse);
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
        setFormData,
        fetchNews,
        news,
        formData,
        updateFormData,
        retrieveFormDataFromLocalStorage,
      }}
    >
      {children}
    </NewsContext.Provider>
  );
};

export { NewsContext, NewsProvider };
