import React, { createContext, useEffect, useRef, useState } from "react";
import axios from "axios";

// Create a new context
const NewsContext = createContext();

// Create a NewsProvider component to wrap your app with the context provider
const NewsProvider = ({ children }) => {
  const [news, setNews] = useState([]);

  const [articles, setArticles] = useState([]);

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

  const newsApiKey = process.env.REACT_APP_MEWS_API_KEY;
  const newsUrl = process.env.REACT_APP_MEWS_API_URL;

  const guardianApiKey = process.env.REACT_APP_GUARDIAN_API_KEY;

  const guardianUrl = process.env.REACT_APP_GUARDIAN_API_URL;

  const fetchNews = async () => {
    try {
      const endpoint = "top-headlines";

      const newsApiParams = {
        q: formData.q,
        category: formData.category,
        searchIn: formData.searchIn,
        country: formData.country,
        from: formData.from,
        to: formData.to,
        language: formData.language,
        apiKey: "dfa44fd0d3e04a7c8078ca422d98b83a",
      };
      const guardianApiParams = {
        q: formData.q,
        tag: formData.tag,
        section: formData.category,
        from: formData.from,
        to: formData.to,
        "api-key": guardianApiKey,
      };

      const queryString = (params) =>
        Object.keys(params)
          .filter((key) => params[key]) // Only include parameters with values
          .map(
            (key) =>
              `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`
          )
          .join("&");

      const newsApiUrl = `${newsUrl}${endpoint}?${queryString(newsApiParams)}`;
      const guardianApiUrl = `${guardianUrl}&${queryString(guardianApiParams)}`;

      let newsData = [];
      let guardianData = [];

      try {
        const newsApiResponse = await axios.get(newsApiUrl);
        newsData = newsApiResponse.data.articles.map((article) => ({
          ...article,
          apiSource: "newsApi",
        }));
      } catch (error) {
        console.error("Error fetching news from newsApi:", error);
      }

      try {
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

      const combinedResponse = [...newsData, ...guardianData];

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
