import React, { useContext, useRef, useState } from "react";
import { NewsContext } from "../Context/NewsContext";
import countriesList from "countries-list";
import { languages } from "../../utili/languges";
import NewsCard from "../NewsCard/NewsCard";

const News = () => {
  const { formRefs, updateFormData, fetchNews, news } = useContext(NewsContext);

  const defaultLangauesOption = "en";

  const defaultLanguage = localStorage.getItem("formData")
    ? getLanguageName(JSON.parse(localStorage.getItem("formData")).language)
    : getLanguageName(defaultLangauesOption);

  const [selectedLanguage, setSelectedLanguage] = useState(defaultLanguage);

  function getLanguageName(code) {
    const language = languages.find((lang) => lang.code === code);
    return language ? language.name : "";
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    const languageValue = formRefs.language.current.value;

    // Update the selected language in the state
    setSelectedLanguage(languageValue);

    const formData = {};

    Object.keys(formRefs).forEach((name) => {
      formData[name] = formRefs[name]?.current?.value;
    });
    const formDataObj = {};
    Object.entries(formData).forEach(([name, value]) => {
      formDataObj[name] = value;
      localStorage.setItem("formData", JSON.stringify(formDataObj));
      updateFormData(name, value);
    });

    fetchNews();
  };

  const countries = Object.entries(countriesList.countries).map(
    ([code, country]) => ({
      code,
      name: country.name,
    })
  );

  return (
    <div>
      {/* Display news articles */}

      {news && news.map((post) => <NewsCard post={post} />)}
    </div>
  );
};

export default News;
