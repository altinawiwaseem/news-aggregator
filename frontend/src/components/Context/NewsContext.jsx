import React, { createContext, useEffect, useRef, useState } from "react";
import axios from "axios";

// Create a new context
const NewsContext = createContext();

// Create a NewsProvider component to wrap your app with the context provider
const NewsProvider = ({ children }) => {
  const [news, setNews] = useState([]);

  const [articles, setArticles] = useState([]);

  const [formData, setFormData] = useState(retrieveFormDataFromLocalStorage());

  const formRefs = {
    category: useRef(),
    searchIn: useRef(),
    country: useRef(),
    sources: useRef(),
    q: useRef(),
    from: useRef(),
    to: useRef(),
    language: useRef(),
  };

  const updateFormData = (name, value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  console.log("formData", formData);

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

  const fetchNews = async () => {
    try {
      const endpoint = "top-headlines";
      const params = {
        q: formData.q,
        sources: formData.sources,
        category: formData.category,
        searchIn: formData.searchIn,
        country: formData.country,
        from: formData.from,
        to: formData.to,
        language: formData.language,
        apiKey: newsApiKey,
      };

      const queryString = Object.keys(params)
        .filter((key) => params[key]) // Only include parameters with values
        .map(
          (key) =>
            `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`
        )
        .join("&");

      const url = `${newsUrl}${endpoint}?${queryString}`;

      const response = await axios.get(url);

      setNews(response.data.articles);

      console.log("response", response.data.articles);
    } catch (error) {
      console.error("Error fetching news:", error);
    }
  };

  useEffect(() => {
    fetchNews();
  }, [formData]);

  // Create the context value object

  // Provide the context value to the child components
  return (
    <NewsContext.Provider
      value={{
        setFormData,
        fetchNews,
        news,
        formRefs,
        updateFormData,

        retrieveFormDataFromLocalStorage,
      }}
    >
      {children}
    </NewsContext.Provider>
  );
};

export { NewsContext, NewsProvider };
